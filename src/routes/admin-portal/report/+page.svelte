<script lang="ts">
	import { Button, Checkbox, Chevron, Dropdown, Helper, Radio, Tooltip } from 'flowbite-svelte';
	import { slide } from 'svelte/transition';
	import HTTP from '@commons/http';
	import AdminHeader from '@components/shared/AdminHeader.svelte';
	import DeleteModal from '@components/modal/DeleteModal.svelte';
	import ForumDetail from '@components/forum/ForumDetail.svelte';
	import CommentCard from '@components/comment/CommentCard.svelte';
	import LoadingSpinner from '@components/spinner/LoadingSpinner.svelte';
	import Modal from '@components/modal/Modal.svelte';
	import Table from '@components/table/Table.svelte';
	import { ReportStatus, type Report, type ReportDetail } from '@models/report';
	import type { ActionTable, DataTable } from "@models/table";
	import type { Document, ForumDetail as Forum } from '@models/forum';
	import type { Comment } from '@models/comment';
	import { deleteReport, getReportDetail, getReports, updateReportStatus } from '@services/admin';
	import { alert } from '@stores/alert';
	import { timeFormat } from '@util/datetime';

    let sortBy = 'createdAt@DESC'

    let isLoading = false;
    let searchText = "";
    let limit = 10;
    let offset = 0;
    let total = 0;
    let reports: Report[];
    const columns: string[] = [
        "Report Code",
        "ประเภท",
        "เหตุผล",
        "สถานะ",
        "รหัสอ้างอิง",
        "วันที่แจ้ง",
        "วันที่แก้ไข",
    ]
    const actions: ActionTable[] = [
        {
            id: 'update-report-status',
            tooltip: 'อัพเดตสถานะ',
            html: `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer rounded-full p-1  bg-[var(--primary-color)] text-white hover:scale-110 ease-in duration-200">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            `,
            async click(item: DataTable) {
                isLoading = true;
                const res = await getReportDetail(item._id)
                if (res.status === HTTP.StatusOK) {
                    selectedReport = {
                        type: item.values[1],
                        modalTitle: item.values[1] === 'กระทู้' ? 'จัดการรายงานกระทู้' : 'จัดการรายงานความคิดเห็น',
                        reportUUID: item._id,
                        reportReason: item.values[2],
                        reportDetail: res.data,
                    }
                    isOpenViewModal = true;
                } else {
                    alert({type: 'error', message: 'ขออภัย, ระบบเกิดความขัดข้อง กรุณาลองใหม่อีกครั้ง!'})
                }
                isLoading = false;
            },
            hidden: (item: DataTable, index: number) => item.values[3] !== statusButtonHTML(ReportStatus.Pending, index)
        },
        {
            id: 'delete-report',
            tooltip: 'ลบรายการ',
            html: `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer rounded-full p-1 bg-[#e15e3f] text-white hover:scale-110 ease-in duration-200">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            `,
            click(item: DataTable) {
                isOpenDeleteModal = true;
                deleteItem = {...item};
            },
        },
    ]
    $: data = (() => {
        const dataTable: DataTable[] = [];
        reports?.forEach((report, index) => {
            dataTable.push({
                "_id": report.reportUUID!,
                values: [
                    report.reportCode,
                    report.type!,
                    report.reportReason,
                    statusButtonHTML(report.reportStatus, index),
                    report.refReportCode || '-',
                    timeFormat(new Date(report.createdAt)),
                    report.updatedAt ? timeFormat(new Date(report.updatedAt)) : '-',
                ],
            })
        })
        return dataTable
    })()

    const fetch = async(event: CustomEvent<{ page: number, searchText: string }>) => {
        searchText = event.detail.searchText
        offset = (event.detail.page > 0 ? event.detail.page-1 : 0)*limit
        await fetchData(offset, limit)
    }

    const fetchData = async(offset: number, limit: number) => {
        const res = await getReports(searchText, offset, limit, sortBy, filterOption)
        reports = res?.data || []
        total = res?.total || 0
    }

    let isOpenViewModal = false;
    let isOpenDeleteModal = false;
    let deleteItem: DataTable;
    let selectedItems: DataTable[] = []
    const deleteAction = async() => {
        isLoading = true
        isOpenDeleteModal = false
        await deleteReport([deleteItem._id])
        data = data.filter(item => item._id !== deleteItem._id)
        total -= 1
        alert({
            type: 'success',
            message: `ลบรายการสำเร็จ`
        })
        isLoading = false
    }
    const multiDeleteAction = async() => {
        if (selectedItems.length) {
            isLoading = true
            await deleteReport(selectedItems.map(item => item._id))
            data = data.filter(item => !selectedItems.map(item => item._id).includes(item._id))
            total -= selectedItems.length
            selectedItems = []
            alert({
                type: 'success',
                message: `ลบรายการสำเร็จ`
            })
            isLoading = false
        }
    }

    const statusButtonHTML = (reportStatus: ReportStatus, index: number) => {
        let buttonClass = ''
        switch (reportStatus) {
            case ReportStatus.Pending:
                buttonClass = 'bg-blue-600'
                break;

            case ReportStatus.Resolved:
                buttonClass = 'bg-green-500'
                break;

            case ReportStatus.Rejected:
                buttonClass = 'bg-orange-400'
                break;

            case ReportStatus.Invalid:
                buttonClass = 'bg-gray-500'
                break;

            case ReportStatus.Closed:
                buttonClass = 'bg-red-500'
                break;
        }

        return `
            <div id="report-status-button-${index}" class="rounded-full w-fit px-2.5 py-1 text-white ${buttonClass}">
                <span class="uppercase">${reportStatus}</span>
            </div>
        `
    }

    let selectedReport = {modalTitle: '', reportUUID: '', type: '', reportReason: '', reportDetail: {} as ReportDetail | undefined}
    const updateReportStatusAction = async (reportStatus: ReportStatus) => {
        isLoading = true;
        const res = await updateReportStatus(selectedReport.reportUUID, reportStatus)
        if (res.status === HTTP.StatusOK) {
            await fetchData(offset, limit)
            isOpenViewModal = false;
            alert({ type: 'success', message: `${selectedReport.modalTitle}สำเร็จ` })
        } else {
            alert({ type: 'error', message: 'ขออภัย, ระบบเกิดความขัดข้อง กรุณาลองใหม่อีกครั้ง!' })
        }
        isLoading = false;
    }

    const forumDetail = (): Forum => {
        const forumDetail: any = {
            forumUUID: '',
            title: selectedReport.reportDetail?.title || '',
            description: selectedReport.reportDetail?.description || '',
            forumImages: selectedReport.reportDetail?.imageURLs?.map(imageURL => { return {url: imageURL} as Document }) || [],
            categories: selectedReport.reportDetail?.categories || [],
            authorUUID: selectedReport.reportDetail?.userUUID || '',
            authorName: selectedReport.reportDetail?.userDisplayName || '',
            authorImageURL: selectedReport.reportDetail?.userImageURL || '',
            createdAt: selectedReport.reportDetail?.createdAt!,
            updatedAt: selectedReport.reportDetail?.updatedAt,
        }
        return forumDetail as Forum
    }
    const commentDetail = (): Comment => {
        const comment: Comment = {
            commentUUID: "",
            commentText: selectedReport.reportDetail?.description || '',
            commentImages: selectedReport.reportDetail?.imageURLs?.map(imageURL => { return {url: imageURL} as Document }) || [],
            commenterUUID: selectedReport.reportDetail?.userUUID || '',
            commenterName: selectedReport.reportDetail?.userDisplayName || '',
            commenterImageURL: selectedReport.reportDetail?.userImageURL || '',
            createdAt: selectedReport.reportDetail?.createdAt!,
            updatedAt: selectedReport.reportDetail?.updatedAt,
        }
        return comment
    }

    const reportStatusTooltip = (id: string): string => {
        const reportStatus = document.getElementById(id)!.children[0].innerHTML as ReportStatus
        switch (reportStatus) {
            case ReportStatus.Pending: return `กำลังรอการอนุมัติ`
            case ReportStatus.Resolved: return `ยืนยันการร้องเรียน`
            case ReportStatus.Rejected: return `ปฏิเสธการร้องเรียน`
            case ReportStatus.Invalid: return `คำร้องเรียนไม่ถูกต้อง`
            case ReportStatus.Closed: return `คำร้องเรียนถูกปิดโดยคำร้องเรียนอื่นที่เกี่ยวข้อง`
        }
    }

    // SORT OPTION
    let isFetching = true;
    const updateSortOption = async (event: CustomEvent<{ sortBy: string, orderBy: string }>) => {
        sortBy = `${mapSortBy(event.detail.sortBy)}@${event.detail.orderBy}`
        await reload()
    }

    const mapSortBy = (sortBy: string) => {
        switch (sortBy) {
            case 'Report Code': return "reportCode"
            case 'ประเภท': return "type"
            case 'เหตุผล': return "reportReason"
            case 'สถานะ': return "reportStatus"
            case 'รหัสอ้างอิง': return "refReportCode"
            case 'วันที่แจ้ง': return "createdAt"
            case 'วันที่แก้ไข': return "updatedAt"
        }
    }

    // FILTER OPTION
    let isOpenFilterOption = false;
    let filterOption: any = {reportStatus: [], type: []}
    let tempFilterOption: any = {reportStatus: [], type: []}
    const filterOptions = [
        {
            key: 'type',
            title: 'ประเภท',
            items: [
                {
                    name: 'กระทู้',
                    value: 'forum',
                },
                {
                    name: 'ความคิดเห็น',
                    value: 'comment',
                }
            ]
        },
        {
            key: 'reportStatus',
            title: 'สถานะ',
            items: [
                {
                    name: ReportStatus.Pending.toUpperCase(),
                    value: ReportStatus.Pending.toUpperCase(),
                },
                {
                    name: ReportStatus.Resolved.toUpperCase(),
                    value: ReportStatus.Resolved.toUpperCase(),
                },
                {
                    name: ReportStatus.Rejected.toUpperCase(),
                    value: ReportStatus.Rejected.toUpperCase(),
                },
                {
                    name: ReportStatus.Invalid.toUpperCase(),
                    value: ReportStatus.Invalid.toUpperCase(),
                },
                {
                    name: ReportStatus.Closed.toUpperCase(),
                    value: ReportStatus.Closed.toUpperCase(),
                }
            ]
        },
    ]

    let isFirstTime = true;
    $: filterOption && reload()
    const reload = async () => {
        if (!isFirstTime) {
            isFetching = true
            await fetchData(offset, limit)
            isFetching = false
        }
        if (isFetching) {
            isFirstTime = false
        }
    }
    $: if(tempFilterOption.reportStatus !== undefined || tempFilterOption.type !== undefined) {
        if (tempFilterOption.reportStatus.length !== filterOption.reportStatus.length) {
            filterOption.reportStatus = [...tempFilterOption.reportStatus].map(item => item.toLowerCase())
        }
        if (tempFilterOption.type.length !== filterOption.type.length) {
            filterOption.type = [...tempFilterOption.type]
        }
    }
</script>

<LoadingSpinner bind:isLoading />

<div class="rounded-lg shadow-md w-full h-full p-4 sm:p-6 overflow-hidden bg-white text-black dark:bg-gray-700 dark:text-white ease-in duration-200">
    <AdminHeader title="รายงานกระทู้" bind:deleteItemsCount={selectedItems.length} addable={false} on:delete={multiDeleteAction} />

    <Button size="lg" color="alternative" class="mb-4 w-fit whitespace-nowrap focus:!border-transparent focus:!ring-0 !bg-transparent !outline-transparent !border-transparent !p-0 !text-[var(--primary-color)] dark:!text-[var(--primary-color-75)]">
        <Chevron><div class="whitespace-nowrap">กรองการค้นหา</div></Chevron>
    </Button>
    <Dropdown class="py-2 rounded-md bg-gray-50 dark:bg-gray-900 drop-shadow-md shadow-md min-w-[170px]" transition={slide} bind:open={isOpenFilterOption}>
        {#each filterOptions as filter, index}
            {#if index}
                <hr class="border-gray-300 dark:border-gray-600 my-2">
            {/if}
            <Helper><div class="px-2 text-sm mb-1 underline">{filter.title}</div></Helper>
            {#each filter.items as item}
                <Checkbox name="sortBy" bind:group={tempFilterOption[filter.key]} value={item.value} class="ease-in duration-150 flex flex-start cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                    {item.name}
                </Checkbox>
            {/each}
        {/each}
    </Dropdown>

    <Table
        bind:limit
        bind:total
        {columns}
        bind:data
        skeletonLoad
        multiSelect
        {actions}
        bind:selectedItems
        sortable
        sortBy="วันที่แจ้ง"
        orderBy={sortBy.substring(sortBy.indexOf("@")+1)}
        bind:isLoading={isFetching}
        on:sort={updateSortOption}
        on:fetch={fetch}
    />
</div>

<Modal bind:open={isOpenViewModal} bind:title={selectedReport.modalTitle} defaultClass="w-fit ease-in overflow-hidden">
    <div class="w-full">
        {#if selectedReport.type === 'กระทู้'}
            <ForumDetail categories={[]} forumDetail={forumDetail()} isView />
        {:else}
            <CommentCard label="ความคิดเห็น" forumUUID="" authorUUID="" comment={commentDetail()} scrollView={false} isView />
        {/if}
    </div>

    <div class="my-4">
        <span class="font-bold">เหตุผลการร้องเรียน: </span>
        <span class="text-red-500">{selectedReport.reportReason}</span>
    </div>
    <hr class="border-gray-200 dark:border-gray-600">

    <div class="text-center flex flex-wrap gap-2 justify-end">
        <Button color="red" on:click={() => isOpenViewModal = false}>ยกเลิก</Button>
        <Button color="yellow" on:click={() => updateReportStatusAction(ReportStatus.Rejected)}>ปฏิเสธการร้องเรียน</Button>
        <Button color="green" on:click={() => updateReportStatusAction(ReportStatus.Resolved)}>ยืนยันการร้องเรียน</Button>
    </div>
</Modal>

<DeleteModal bind:open={isOpenDeleteModal} deleteButtonName="ยืนยัน" on:delete={deleteAction} >
    คุณยืนยันที่จะ<span class="text-red-500">ลบรายงาน {deleteItem?.values[0]} </span>หรือไม่?
</DeleteModal>

{#key data}
    {#each data as _, index}
        <Tooltip triggeredBy="#report-status-button-{index}" shadow trigger="hover" placement="top" class="z-30 transition-colors ease-in duration-200 !bg-white !text-[var(--primary-color)] dark:!text-white dark:!bg-gray-700">
            <div in:slide={{duration: 200}}>
                {reportStatusTooltip(`report-status-button-${index}`)}
            </div>
        </Tooltip>
    {/each}
{/key}