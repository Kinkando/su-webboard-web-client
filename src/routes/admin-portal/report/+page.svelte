<script lang="ts">
	import DeleteModal from '@components/modal/DeleteModal.svelte';
	import AdminHeader from '@components/shared/AdminHeader.svelte';
	import LoadingSpinner from '@components/spinner/LoadingSpinner.svelte';
	import Table from '@components/table/Table.svelte';
	import type { Report, ReportStatus } from '@models/report';
	import type { ActionTable, DataTable } from "@models/table";
	import { deleteReport, getReports } from '@services/admin';
	import { timeRange } from '@util/datetime';

    let type: 'forum' | 'comment' | undefined = undefined
    let reportStatus: ReportStatus | undefined = undefined
    let sortBy = 'createdAt@DESC'

    let isLoading = false;
    let searchText = "";
    let limit = 10;
    let offset = 0;
    let total = 0;
    let reports: Report[];
    const columns: string[] = [
        // "ชื่อผู้ร้องเรียน",
        // "ชื่อผู้ถูกร้องเรียน",
        "Report Code",
        "ประเภท", // กระทู้ คอมเมนต์
        "เหตุผล",
        "สถานะ",
        "รหัสอ้างอิง",
        "วันที่ส่งเรื่อง",
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
            click(item: DataTable) {
                console.log("VIEW REPORT FORUM")
            },
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
        reports?.forEach(report => {
            dataTable.push({
                "_id": report.reportUUID!,
                values: [
                    report.reportCode,
                    report.type!,
                    report.reportReason,
                    report.reportStatus,
                    report.refReportCode || '-',
                    timeRange(new Date(report.createdAt)),
                    report.updatedAt ? timeRange(new Date(report.updatedAt)) : 'N/A',
                ],
            })
        })
        return dataTable
    })()

    const fetch = async(event: CustomEvent<{ page: number, searchText: string }>) => {
        searchText = event.detail.searchText
        offset = (event.detail.page > 0 ? event.detail.page-1 : 0)*limit
        await fetchData(searchText, offset, limit)
    }

    const fetchData = async(search: string, offset: number, limit: number) => {
        const res = await getReports(search, offset, limit, sortBy, reportStatus, type)
        reports = res?.data || []
        total = res?.total || 0
    }

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
</script>

<LoadingSpinner bind:isLoading />

<div class="rounded-lg shadow-md w-full h-full p-4 sm:p-6 overflow-hidden bg-white text-black dark:bg-gray-700 dark:text-white ease-in duration-200">
    <AdminHeader title="รายงานกระทู้" bind:deleteItemsCount={selectedItems.length} addable={false} on:delete={multiDeleteAction} />
    <Table bind:limit bind:total {columns} bind:data skeletonLoad multiSelect on:fetch={fetch} {actions} bind:selectedItems />
</div>

<DeleteModal bind:open={isOpenDeleteModal} deleteButtonName="ยืนยัน" on:delete={deleteAction} >
    คุณยืนยันที่จะ<span class="text-red-500">ลบรายงาน {deleteItem?.values[0]} </span>หรือไม่?
    <div>หมายเหตุ: หลังจากลบรายงานแล้ว จะส่งผลให้รายงานอื่นที่เกี่ยวข้องกับกระทู้หรือความคิดเห็นดังกล่าว เปลี่ยนเป็นสถานะ Closed</div>
</DeleteModal>