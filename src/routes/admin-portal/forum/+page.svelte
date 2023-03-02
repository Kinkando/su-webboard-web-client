<script lang="ts">
	import Table from '@components/table/Table.svelte';
	import type { ForumReport } from '@models/forum';
	import type { ActionTable, DataTable } from "@models/table";
	import { getForumReport } from "@services/admin";

    let limit = 10;
    let total = 0;
    let forums: ForumReport[];
    const columns: string[] = [
        "ชื่อผู้รายงาน",
        "ชื่อผู้ถูกร้องเรียน",
        "คำอธิบาย",
    ]
    const actions: ActionTable[] = [
        {
            html: `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer rounded-full p-1  bg-[var(--primary-color)] text-white hover:scale-110 ease-in duration-200">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            `,
            click(item: DataTable) {
                console.log("EDIT")
            },
        },
        {
            html: `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer rounded-full p-1 bg-[#e15e3f] text-white hover:scale-110 ease-in duration-200">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            `,
            click(item: DataTable) {
                console.log("DELETE")
            },
        },
    ]
    $: data = (() => {
        const dataTable: DataTable[] = [];
        forums?.forEach(forum => {
            dataTable.push({
                "_id": forum.reportUUID!,
                values: [
                    forum.reporterName,
                    forum.plaintiffName,
                    forum.description,
                ],
            })
        })
        return dataTable
    })()

    const fetchForumReports = async(event: CustomEvent<{ page: number }>) => {
        const res = await getForumReport((event.detail.page-1)*limit, limit)
        forums = res.data
        total = res.total
    }
</script>

<div class="rounded-lg shadow-md w-full h-full p-4 sm:p-6 overflow-hidden bg-white text-black dark:bg-gray-700 dark:text-white ease-in duration-200">
    <Table bind:limit bind:total {columns} bind:data skeletonLoad multiSelect on:fetch={fetchForumReports} {actions} />
</div>