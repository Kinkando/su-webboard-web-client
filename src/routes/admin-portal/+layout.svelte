<script lang="ts">
	import Sidebar from './../../components/layout/Sidebar.svelte';
	import { page } from "$app/stores";
	import { Breadcrumb, BreadcrumbItem, DarkMode, Tooltip } from "flowbite-svelte";
	import { fly, slide } from "svelte/transition";

    $: currentRoute = $page.route.id!;
    let rootPath = "/admin-portal"
    let isSidebarExpand = false;
    let sidebarItems = [
        {
            prefixIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-speedometer2" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z"/><path fill-rule="evenodd" d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10zm8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3z"/></svg>`,
            label: 'แดชบอร์ด',
            href: `${rootPath}`,
        },
        {
            prefixIcon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" /><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" /></svg>`,
            label: 'หมวดหมู่',
            href: `${rootPath}/category`,
        },
        {
            prefixIcon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" /></svg>`,
            label: 'รายงานกระทู้',
            href: `${rootPath}/report`,
        },
        {
            prefixIcon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>`,
            label: 'นักศึกษา',
            href: `${rootPath}/student`,
        },
        {
            prefixIcon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>`,
            label: 'อาจารย์',
            href: `${rootPath}/teacher`,
        },
    ]
</script>

<Sidebar bind:rootPath bind:sidebarItems bind:isSidebarExpand />

<Tooltip placement="bottom" shadow trigger="hover" triggeredBy="#theme-toggle" class="z-40 transition-colors ease-in duration-200 !bg-white !text-[var(--primary-color)] dark:!text-white dark:!bg-gray-700">
    <div in:slide={{duration: 200}}>เปลี่ยนธีม</div>
</Tooltip>

<main class="relative min-[1000.1px]:ml-[225px] max-[1000.1px]:top-16 h-full overflow-hidden">
    <header class="fixed w-full top-0 min-[1000.1px]:hidden h-16 flex items-center px-4 text-2xl shadow-md text-black bg-white dark:text-gray-300 dark:bg-gray-900 ease-in duration-200 z-30">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <span class="float-left flex items-center sticky top-0 z-40 cursor-pointer" on:click={() => isSidebarExpand = !isSidebarExpand}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        </span>
        <!-- <span class="ml-2">{ sidebarItems.find(item => currentRoute === item.href)?.label }</span> -->
        <span class="ml-2">SU WEBBOARD</span>
        <DarkMode id="theme-toggle" btnClass="ml-auto scale-110 text-yellow-400 dark:text-yellow-300 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-full p-2 transition-all ease-in duration-200" />
    </header>

    <nav class="h-16 flex items-center px-4 max-[1000.1px]:hidden bg-gray-200 dark:bg-gray-800 ease-in duration-200">
        <div class="text-black dark:text-white font-bold text-2xl">ผู้ดูแลระบบ</div>
        <!-- <Breadcrumb aria-label="SU Webboard">
            <BreadcrumbItem href="{rootPath}" home>แดชบอร์ด</BreadcrumbItem>
            {#if currentRoute.toString().lastIndexOf("/") > 0}
                <BreadcrumbItem>{ sidebarItems.find(item => currentRoute === item.href)?.label }</BreadcrumbItem>
            {/if}
        </Breadcrumb> -->
        <DarkMode id="theme-toggle" btnClass="ml-auto scale-110 text-yellow-400 dark:text-yellow-300 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-full p-2 transition-all ease-in duration-200" />
    </nav>

    {#key currentRoute}
        <section class="px-4 pb-4 max-[1000.1px]:pt-4 min-h-[calc(100vh-64px*2)] bg-gray-200 dark:bg-gray-800 transition-colors ease-in duration-200">
            {#if currentRoute !== rootPath}
                <div in:fly={{y: -20, duration: 250, delay: 100}}>
                    <slot />
                </div>
            {:else}
                <slot />
            {/if}
        </section>
    {/key}

    <footer class="h-16 flex items-center px-4 bg-gray-100 text-black dark:text-gray-400 dark:bg-gray-900 transition-colors ease-in duration-200">
        <span>&copy;&nbsp;</span>su-webboard - 2023
    </footer>
</main>