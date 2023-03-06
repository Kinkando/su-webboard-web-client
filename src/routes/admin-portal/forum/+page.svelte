<script lang="ts">
	import Table from '@components/table/Table.svelte';
	import type { ForumReport } from '@models/forum';
	import type { ActionTable, DataTable } from "@models/table";
	import { getForumReport } from "@services/admin";
	import { Button } from 'flowbite-svelte';

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
                console.log("VIEW REPORT FORUM")
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
    <div class="mb-4">
        <h1 class="font-bold text-2xl">รายงานกระทู้</h1>
    </div>
    <Table bind:limit bind:total {columns} bind:data skeletonLoad multiSelect on:fetch={fetchForumReports} {actions} />
</div>