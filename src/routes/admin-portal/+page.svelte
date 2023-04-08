<script lang="ts">
	import { getHomeAdminData } from "@services/admin";
	import { onMount } from "svelte";
    import Chart from 'chart.js/auto';
	import LoadingSpinner from "@components/spinner/LoadingSpinner.svelte";
	import type { HomeAdmin } from "@models/home";
	import { timeRange } from '@util/datetime';
	import { initAdminSocket } from "@util/socket";
    import adminSocket from "@stores/admin_socket";
	import UserOnlineCard from "@components/user/UserOnlineCard.svelte";

    let doughnutChartElm!: HTMLCanvasElement;
    let lineChartElm!: HTMLCanvasElement;

    let isLoading = true

    let homeAdmin!: HomeAdmin
    let doughnutChart!: Chart<"doughnut", number[], string>
    let lineChart!: Chart<"line", number[], string>

    onMount(async() => {
        isLoading = true;

        initAdminSocket()

        doughnutChart = initViewDoughnutChart()
        lineChart = initViewLineChart()

        homeAdmin = await getHomeAdminData()
        isLoading = false;

        if (homeAdmin.reportStatus) {
            reportCards[0].total = homeAdmin.reportStatus.pending
            reportCards[1].total = homeAdmin.reportStatus.resolved
            reportCards[2].total = homeAdmin.reportStatus.rejected
            reportCards[3].total = homeAdmin.reportStatus.closed
            reportCards[4].total = homeAdmin.reportStatus.invalid

            doughnutChart.data.datasets[0].data = [
                homeAdmin.reportStatus.pending,
                homeAdmin.reportStatus.resolved,
                homeAdmin.reportStatus.rejected,
                homeAdmin.reportStatus.closed,
                homeAdmin.reportStatus.invalid,
            ]
        }
        doughnutChart.data.datasets[0].backgroundColor = ['#0064F2', '#0E9F6E', '#FF8A4C', '#F05252', '#6B7280']
        doughnutChart.data.labels = ['Pending', 'Resolved', 'Rejected', 'Closed', 'Invalid']
        doughnutChart.update()

        lineChart.data.datasets[0].backgroundColor = []
        lineChart.data.datasets[0].data = []
        lineChart.data.labels = []

        if (homeAdmin.forums) {
            for (const date of Object.keys(homeAdmin.forums).reverse()) {
                (lineChart.data.datasets[0].backgroundColor as string[]).push(dateColor(new Date(date)))
                lineChart.data.datasets[0].data.push(homeAdmin.forums[date])
                lineChart.data.labels.push(timeRange(new Date(date)))
            }
        }
        lineChart.update()
    })

    const initViewDoughnutChart = () => {
        // const ctx = doughnutChart.getContext('2d');
        const chart = new Chart(doughnutChartElm, {
            type: 'doughnut',
            data: {
                labels: ['Pending', 'Resolved', 'Rejected', 'Closed', 'Invalid'],
                datasets: [
                    {
                        // label: 'My First Dataset',
                        data: [0, 0, 0, 0, 0],
                        backgroundColor: ['#0064F2', '#0E9F6E', '#FF8A4C', '#F05252', '#6B7280'],
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
            },
        });
        return chart
    }

    const initViewLineChart = () => {
        // const ctx = lineChart.getContext('2d');
        const now = new Date()
        const date = [ dateLabel(now, 7), dateLabel(now, 6), dateLabel(now, 5), dateLabel(now, 4), dateLabel(now, 3), dateLabel(now, 2), dateLabel(now, 1) ]
        return new Chart(lineChartElm, {
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
                responsive: innerWidth >= 500,
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

    const updateViewResize = () => {
        lineChart.options.responsive = innerWidth >= 500
        lineChart.update()
    }

    $: innerWidth = 0;
    $: reportCardMinWidth = 224;
</script>

<svelte:window bind:innerWidth on:resize={updateViewResize} />

<LoadingSpinner bind:isLoading />

<!-- REPORT STATUS CARD -->
<div class="w-full mb-4 bg-white dark:bg-gray-700 overflow-hidden rounded-lg shadow-md relative ease-in duration-200 {isLoading ? 'opacity-0' : ''}">
    <div class="p-2 sm:p-4 bg-gray-300 dark:bg-gray-900 ease-in duration-200 !text-black dark:!text-white">
        <span class="">สรุปจำนวนแยกตามสถานะของการร้องเรียน</span>
    </div>
    <div class=" p-2 sm:p-4 2xl:flex grid gap-2 sm:gap-4 {isLoading ? 'opacity-0' : ''}" style="{innerWidth <= 1536 ? `grid-template-columns: repeat(auto-fill, minmax(${reportCardMinWidth}px, 1fr))` : ''}">
        {#each reportCards as reportCard}
            <div class="ease-in duration-200 rounded-md flex shadow-lg overflow-hidden w-full hover:brightness-75">
                <div class="{reportCard.class} min-w-[6rem] max-w-[6rem] w-full rounded-l-lg">
                    <div class="relative top-1/2 -translate-y-1/2 flex justify-center text-white">
                        {@html reportCard.icon}
                    </div>
                </div>
                <div class="ease-in duration-200 text-center w-full bg-gray-200 dark:bg-gray-800">
                    <div class="ease-in duration-200 text-black dark:text-gray-200 whitespace-nowrap text-ellipsis overflow-hidden p-2 sm:p-4">{reportCard.label}</div>
                    <hr class="ease-in duration-200 border-gray-300 dark:border-gray-600">
                    {#if isLoading}
                        <div class="w-1/3 h-6 mx-auto `my`-2 sm:my-4 bg-gray-300 rounded-full dark:bg-gray-600" />
                    {:else}
                        <div class="ease-in duration-200 text-black dark:text-gray-200 whitespace-nowrap text-ellipsis overflow-hidden p-2 sm:p-4">{reportCard.total}</div>
                    {/if}
                </div>
            </div>
        {/each}
    </div>
</div>

<!-- STATISTIC CHART -->
<div class="md:flex md:gap-4 {isLoading ? 'opacity-0' : ''}">
    <div class="w-full max-w-full text-black dark:text-white bg-white dark:bg-gray-700 overflow-hidden rounded-lg shadow-md relative hover:brightness-75 ease-in duration-200">
        <div class="bg-gray-300 dark:bg-gray-900 transition-colors ease-in duration-200 !text-black dark:!text-white">
            <div class="p-2 sm:p-4">
                ยอดผู้สร้างกระทู้ 7 วันย้อนหลัง
            </div>
        </div>
        <div class="overflow-x-auto p-2 sm:p-4">
            <canvas bind:this={lineChartElm} id="line-chart" class="!w-full !min-h-[360px] !max-h-[360px] !min-w-[500px] sm:!min-w-full"></canvas>
        </div>
    </div>

    <div class="md:min-w-[24rem] md:mt-0 mt-4 md:w-fit w-full text-black dark:text-white bg-white dark:bg-gray-700 rounded-lg shadow-md flex flex-col overflow-hidden relative hover:brightness-75 ease-in duration-200">
        <div class="p-2 sm:p-4 bg-gray-300 dark:bg-gray-900 ease-in duration-200 !text-black dark:!text-white">
            <span class="">สรุปสถานะของการร้องเรียน</span>
        </div>
        <div class="w-72 relative px-6 py-4 m-auto {homeAdmin?.reportStatus ? '' : 'hidden'}">
            <canvas bind:this={doughnutChartElm} id="doughnut-chart"></canvas>
        </div>
        {#if !homeAdmin?.reportStatus}
            <div class="my-2 m-auto">
                <img src="/images/empty.png" alt="" class="m-auto w-48">
                <div class="text-center mt-4 text-black dark:text-white">ไม่พบข้อมูล</div>
            </div>
        {/if}
    </div>
</div>

{#if !isLoading}
    <div class="mt-4 w-full max-w-full text-black dark:text-white bg-white dark:bg-gray-700 overflow-hidden rounded-lg shadow-md relative ease-in duration-200">
        <div class="bg-gray-300 dark:bg-gray-900 transition-colors ease-in duration-200 !text-black dark:!text-white">
            <div class="p-2 sm:p-4">ผู้ใช้งานที่กำลังออนไลน์</div>
        </div>
        <div class="p-2 sm:p-4 flex gap-2 sm:gap-4 flex-wrap">
            {#if $adminSocket.length > 0}
                {#each $adminSocket as user}
                    <UserOnlineCard bind:user />
                {/each}
            {:else}
                <div class="text-center m-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" fill="currentColor" class="bi bi-person-slash m-auto mb-4" viewBox="0 0 16 16">
                        <path d="M13.879 10.414a2.501 2.501 0 0 0-3.465 3.465l3.465-3.465Zm.707.707-3.465 3.465a2.501 2.501 0 0 0 3.465-3.465Zm-4.56-1.096a3.5 3.5 0 1 1 4.949 4.95 3.5 3.5 0 0 1-4.95-4.95ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm.256 7a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z"/>
                    </svg>
                    ไม่มีผู้ใช้งานที่กำลังออนไลน์อยู่ในขณะนี้
                </div>
            {/if}
        </div>
    </div>
{/if}