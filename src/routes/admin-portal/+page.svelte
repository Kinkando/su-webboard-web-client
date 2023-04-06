<script lang="ts">
	import LoadingSpinner from './../../components/spinner/LoadingSpinner.svelte';
	import { getHomeAdminData } from "@services/admin";
	import { onMount } from "svelte";
    import Chart from 'chart.js/auto';
    import { getRelativePosition } from 'chart.js/helpers';
	import { timeRange } from '@util/datetime';

    let doughnutChart!: HTMLCanvasElement;
    let lineChart!: HTMLCanvasElement;

    let isLoading = true

    onMount(async() => {
        isLoading = true;

        const doughnutChart = initViewDoughnutChart()
        const lineChart = initViewLineChart()

        await new Promise(r => setTimeout(() => r(""), 2000))
        const resp = await getHomeAdminData()
        reportCards[0].total = resp.reportStatus.pending
        reportCards[1].total = resp.reportStatus.resolved
        reportCards[2].total = resp.reportStatus.rejected
        reportCards[3].total = resp.reportStatus.closed
        reportCards[4].total = resp.reportStatus.invalid

        doughnutChart.data.datasets[0].data = [
            resp.reportStatus.pending,
            resp.reportStatus.resolved,
            resp.reportStatus.rejected,
            resp.reportStatus.closed,
            resp.reportStatus.invalid,
        ]
        doughnutChart.data.datasets[0].backgroundColor = ['#0064F2', '#0E9F6E', '#FF8A4C', '#F05252', '#6B7280']
        doughnutChart.data.labels = ['Pending', 'Resolved', 'Rejected', 'Closed', 'Invalid']
        doughnutChart.update()

        isLoading = false;
    })

    const initViewDoughnutChart = () => {
        const ctx = doughnutChart.getContext('2d');
        const chart = new Chart(doughnutChart, {
            type: 'doughnut',
            data: {
                labels: ['Waiting'],
                datasets: [
                    {
                        // label: 'My First Dataset',
                        data: [1],
                        backgroundColor: ['#0064F2'],
                        // hoverOffset: 4,
                        borderWidth: 0
                    }
                ]
            },
            options: {
                // borderRadius: '30',
                responsive: true,
                cutout: '80%',
                spacing: 0,
                plugins: {
                    legend: {
                        position: 'bottom',
                        display: true,
                        labels: {
                            usePointStyle: true,
                            // useBorderRadius: true,
                            // borderRadius: 20,
                            padding: 10,
                            font: {
                                size: 12
                            }
                        }
                    },
                    title: {
                        // display: true,
                        // text: 'My Personal Portfolio'
                    }
                },
                // onClick: (e) => {
                //     const canvasPosition = getRelativePosition(e, chart);

                //     // Substitute the appropriate scale IDs
                //     const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
                //     const dataY = chart.scales.y.getValueForPixel(canvasPosition.y);
                // }
            },
        });
        return chart
    }

    const initViewLineChart = () => {
        const ctx = lineChart.getContext('2d');
        const now = new Date()
        const date = [ dateLabel(now, 7), dateLabel(now, 6), dateLabel(now, 5), dateLabel(now, 4), dateLabel(now, 3), dateLabel(now, 2), dateLabel(now, 1) ]
        return new Chart(ctx!, {
            type: 'line',
            data: {
                labels: [ date[0].date, date[1].date, date[2].date, date[3].date, date[4].date, date[5].date, date[6].date ],
                datasets: [
                    {
                        label: 'จำนวนการตั้งกระทู้',
                        data: [1, 3, 2, 7, 5, 6, 4],
                        backgroundColor: [ date[0].color, date[1].color, date[2].color, date[3].color, date[4].color, date[5].color, date[6].color ],
                        // hoverOffset: 4,
                        borderWidth: 0,
                        fill: true,
                        // borderColor: 'rgb(64, 130, 109)',
                        tension: 0.4,
                    }
                ]
            },
            options: {
                responsive: true,
            }
        });
    }

    const dateLabel = (date: Date, decreaseDate: number) => {
        const newDate = new Date(date)
        newDate.setDate(newDate.getDate() - decreaseDate)
        return {date: timeRange(newDate), color: dateColor(newDate)}
    }

    const dateColor = (date: Date) => {
        switch(date.getDay()) {
            case 0: return '#ff6161'
            case 1: return '#fff700'
            case 2: return '#ff7ae7'
            case 3: return '#67fe85'
            case 4: return '#ffb54d'
            case 5: return '#75fdff'
            default: return '#b981fe'
        }
    }

    const reportCards: {label: string, class: string, total: number, icon: string}[] = [
        {
            label: 'pending',
            class: 'bg-blue-600',
            total: 0,
            icon: `
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-hourglass-split" viewBox="0 0 16 16">
                <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z"/>
            </svg>`
        },
        {   label: 'resolved',
            class: 'bg-green-500',
            total: 0,
            icon: `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-14 h-14">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            `
        },
        {   label: 'rejected',
            class: 'bg-orange-400',
            total: 0,
            icon: `
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-shield-check" viewBox="0 0 16 16">
                    <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
                <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                </svg>
            `
        },
        {   label: 'closed',
            class: 'bg-red-500',
            total: 0,
            icon: `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-14 h-14">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
            `
        },
        {   label: 'invalid',
            class: 'bg-gray-500',
            total: 0,
            icon: `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-14 h-14">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            `
        },
    ]


</script>

<!-- <LoadingSpinner bind:isLoading /> -->

<!-- {#if isLoading} -->
    <!-- <div class="absolute z-50 left-0 top-0 w-full h-full block backdrop-brightness-75"></div> -->
    <!-- <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <button disabled type="button" class="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
            <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
            </svg>
            Loading...
        </button>
    </div> -->
<!-- {/if} -->

<div class="flex flex-wrap gap-4 mb-4">
    {#each reportCards as reportCard}
        <div class="ease-in duration-200 rounded-md shadow-lg flex overflow-hidden min-w-[14rem] w-fit hover:brightness-75">
            <div class="{reportCard.class} min-w-[6rem] max-w-[6rem] w-full rounded-l-lg">
                <div class="relative top-1/2 -translate-y-1/2 flex justify-center text-white">
                    {@html reportCard.icon}
                </div>
            </div>
            <div class="ease-in duration-200 text-center w-full bg-white dark:bg-gray-700">
                <div class="ease-in duration-200 text-black dark:text-gray-200 whitespace-nowrap text-ellipsis overflow-hidden p-2 sm:p-4">{reportCard.label}</div>
                <hr class="ease-in duration-200 border-gray-200 dark:border-gray-600">
                {#if isLoading}
                    <div class="w-1/3 h-6 mx-auto my-2 sm:my-4 bg-gray-300 rounded-full dark:bg-gray-600" />
                {:else}
                    <div class="ease-in duration-200 text-black dark:text-gray-200 whitespace-nowrap text-ellipsis overflow-hidden p-2 sm:p-4">{reportCard.total}</div>
                {/if}
            </div>
        </div>
    {/each}
</div>

<!-- <div class="flex lg:block"> -->
    <div class="text-black dark:text-white bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md overflow-hidden relative hover:brightness-75 ease-in duration-200">
        <div class="p-2 sm:p-4 bg-gray-300 dark:bg-gray-900 ease-in duration-200">
            <span class="">ยอดผู้สร้างกระทู้ 7 วันย้อนหลัง</span>
        </div>
        <canvas bind:this={lineChart}></canvas>
    </div>

    <div class="text-black dark:text-white bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md flex flex-col w-fit cursor-pointer overflow-hidden relative hover:brightness-75 ease-in duration-200">
        <div class="p-2 sm:p-4 bg-gray-300 dark:bg-gray-900 ease-in duration-200">
            <span class="">สรุปสถานะของการร้องเรียน</span>
        </div>
        <div class="w-72 relative px-6 py-4">
            <canvas bind:this={doughnutChart}></canvas>
        </div>
    </div>
<!-- </div> -->
