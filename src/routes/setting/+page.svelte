<script lang="ts">
	import { isOpenPushNotification, setPushNotification } from "@util/localstorage";
	import { Breadcrumb, BreadcrumbItem, DarkMode, Toggle } from "flowbite-svelte";

    $: isDarkTheme = (() => {
        const theme = localStorage.getItem('color-theme')
        return theme !== null && theme === 'dark'
    })()
    function toggleTheme() {
        const toggle = document.getElementById('theme-toggle')
        if (toggle) {
            toggle.click()
        }
    }

    $: isOpenPushNoti = isOpenPushNotification()
    function togglePushNoti() {
        isOpenPushNoti = !isOpenPushNoti
        setPushNotification(isOpenPushNoti)
    }
</script>

<div class="mb-4">
    <Breadcrumb aria-label="SU Webboard">
        <BreadcrumbItem href="/" home>หน้าแรก</BreadcrumbItem>
        <BreadcrumbItem>ตั้งค่า</BreadcrumbItem>
    </Breadcrumb>
</div>

<div class="ease-in duration-200 bg-white dark:bg-gray-900 w-full rounded-md shadow-lg p-4 sm:p-6 max-w-4xl m-auto">
    <div class="text-black dark:text-white">ตั้งค่าการแสดงผลและการแจ้งเตือน</div>
    <hr class="my-4">
    <div class="flex items-center justify-between">
        <div class="flex items-center text-black dark:text-white overflow-hidden">
            <DarkMode disabled btnClass="text-black dark:text-white rounded-full">
                <svelte:fragment slot="darkIcon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32">
                        <path fill="currentColor" d="M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6ZM5.394 6.813L6.81 5.399l3.505 3.506L8.9 10.319zM2 15.005h5v2H2zm3.394 10.193L8.9 21.692l1.414 1.414l-3.505 3.506zM15 25.005h2v5h-2zm6.687-1.9l1.414-1.414l3.506 3.506l-1.414 1.414zm3.313-8.1h5v2h-5zm-3.313-6.101l3.506-3.506l1.414 1.414l-3.506 3.506zM15 2.005h2v5h-2z"/>
                    </svg>
                </svelte:fragment>
                <svelte:fragment slot="lightIcon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32">
                        <path fill="currentColor" d="M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3Z"/>
                    </svg>
                </svelte:fragment>
            </DarkMode>
            <DarkMode id="theme-toggle" class="hidden"></DarkMode>
            <div class="mx-2 whitespace-nowrap overflow-hidden text-ellipsis">โหมดสีเข้ม</div>
        </div>
        <Toggle class="cursor-pointer" color="green" on:click={toggleTheme} checked={isDarkTheme}></Toggle>
    </div>

    <div class="flex items-center justify-between mt-4">
        <div class="flex items-center text-black dark:text-white overflow-hidden">
            {#if isOpenPushNoti}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="min-w-[1.5rem] min-h-[1.5rem] max-w-[1.5rem] max-h-[1.5rem]">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                </svg>
            {:else}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="min-w-[1.5rem] min-h-[1.5rem] max-w-[1.5rem] max-h-[1.5rem]">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.143 17.082a24.248 24.248 0 003.844.148m-3.844-.148a23.856 23.856 0 01-5.455-1.31 8.964 8.964 0 002.3-5.542m3.155 6.852a3 3 0 005.667 1.97m1.965-2.277L21 21m-4.225-4.225a23.81 23.81 0 003.536-1.003A8.967 8.967 0 0118 9.75V9A6 6 0 006.53 6.53m10.245 10.245L6.53 6.53M3 3l3.53 3.53" />
                </svg>
            {/if}
            <div class="mx-2 whitespace-nowrap overflow-hidden text-ellipsis">เปิด/ปิดการแจ้งเตือนแบบพุช</div>
        </div>
        <Toggle class="cursor-pointer" color="green" on:click={togglePushNoti} checked={isOpenPushNoti}></Toggle>
    </div>
</div>