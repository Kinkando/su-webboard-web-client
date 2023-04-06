<script lang="ts">
	import type { ReportStatistic } from "@models/report";
	import { getHomeAdminData } from "@services/admin";
	import { onMount } from "svelte";

    let isLoading = true

    onMount(async() => {
        isLoading = true;
        await new Promise(r => setTimeout(() => r(""), 500))
        const reportStatus = await getHomeAdminData()
        reportCards.push(
            {
                label: 'pending',
                class: 'bg-blue-600',
                total: reportStatus.pending,
                icon: `
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-hourglass-split" viewBox="0 0 16 16">
                    <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z"/>
                </svg>`
            },
            {   label: 'resolved',
                class: 'bg-green-500',
                total: reportStatus.resolved,
                icon: `
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-14 h-14">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                `
            },
            {   label: 'rejected',
                class: 'bg-orange-400',
                total: reportStatus.rejected,
                icon: `
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-shield-check" viewBox="0 0 16 16">
                        <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
                    <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                    </svg>
                `
            },
            {   label: 'closed',
                class: 'bg-red-500',
                total: reportStatus.closed,
                icon: `
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-14 h-14">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                `
            },
            {   label: 'invalid',
                class: 'bg-gray-500',
                total: reportStatus.invalid,
                icon: `
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-14 h-14">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                `
            },
        )
        isLoading = false;
    })

    const reportCards: {label: string, class: string, total: number, icon: string}[] = []
</script>

{#if isLoading}
    Loading
{:else}
    <div class="flex flex-wrap gap-4">
        {#each reportCards as reportCard}
            <div class="ease-in duration-200 rounded-md shadow-lg flex overflow-hidden h-32 min-w-[14rem] w-fit">
                <div class="{reportCard.class} min-w-[6rem] max-w-[6rem] w-full rounded-l-lg">
                    <div class="relative top-1/2 -translate-y-1/2 flex justify-center text-white">
                        {@html reportCard.icon}
                    </div>
                </div>
                <div class="ease-in duration-200 text-center w-full bg-white dark:bg-gray-900 flex flex-col justify-between">
                    <div class="ease-in duration-200 text-black dark:text-gray-200 whitespace-nowrap text-ellipsis overflow-hidden p-4 sm:p-6">{reportCard.label}</div>
                    <hr class="ease-in duration-200 border-gray-200 dark:border-gray-600">
                    <div class="ease-in duration-200 text-black dark:text-gray-200 whitespace-nowrap text-ellipsis overflow-hidden p-4 sm:p-6">{reportCard.total}</div>
                </div>
            </div>
        {/each}
    </div>
{/if}