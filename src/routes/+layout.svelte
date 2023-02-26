<script lang="ts">
    import "../app.postcss";
	import { onMount } from 'svelte';
	import { fly, slide } from 'svelte/transition';
	import { DarkMode, Indicator, Input, Popover, Tooltip } from "flowbite-svelte";
    import { page } from '$app/stores';
	import { afterNavigate, beforeNavigate, goto } from "$app/navigation";
	import LoadingSpinner from '@components/spinner/LoadingSpinner.svelte';
	import AuthGuard from '@middleware/AuthGuard.svelte';
    import type { Notification } from "@models/notification";
	import type { User } from "@models/user";
	import { UserType } from "@models/auth";
	import userStore from '@stores/user';
	import notificationStore from '@stores/notification';

    export let data: any;
    let notification: Notification = data?.notification;
    let user: User = data?.user;

    $: if($userStore) { user = $userStore }
    $: if($notificationStore) { notification = $notificationStore }

    let isLoading = true;
    onMount(() => isLoading = false)
    beforeNavigate(() => isLoading = true)
    afterNavigate(() => isLoading = false)

    $: title = (() => {
        const adminPortalPrefix = "ADMIN PORTAL | "
        const generalUserPrefix = "SU Webboard | "

        switch ($page.route.id!) {
            // Admin portal page
            case "/admin-portal": return adminPortalPrefix + "Home"
            case "/admin-portal/user": return adminPortalPrefix + "Manage User"
            case "/admin-portal/category": return adminPortalPrefix + "Manage Category"
            case "/admin-portal/forum": return adminPortalPrefix + "Manage Forum"

            // General user page
            case "/": return generalUserPrefix + "Home"
            case "/login": return generalUserPrefix + "Sign in"
            case "/profile": return generalUserPrefix + "Profile"
            case "/announcement": return generalUserPrefix + "New Announcement"
            case "/forum": return generalUserPrefix + "New Forum"

            // List page
            case "/category/[categoryID]": return generalUserPrefix + "Category List"
            case "/announcement/list": return generalUserPrefix + "Announcement List"
            case "/popular": return generalUserPrefix + "Popular List"
            case "/search": return generalUserPrefix + "Search"

            // Forum page
            case "/announcement/[forumUUID]": return generalUserPrefix + "Announcement Forum"
            case "/forum/[forumUUID]": return generalUserPrefix + "Forum Detail"
        }
    })()
    $: isUserSite = !$page.url.pathname?.startsWith("/admin-portal") && $page.url.pathname! != "/login";

    const defaultImageURL = "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    let searchText = "";

    const signout = async () => await fetch("/api/token/revoke", { method: "POST" }).then(res => goto("/login"));
    const search = (event: KeyboardEvent) => {
        if (event.key === 'Enter' && searchText) {
            goto('/search?keyword='+searchText)
        }
    }

    const tooltips = [
        {
            id: "theme-toggle",
            text: "เปลี่ยนโหมด"
        },
        {
            id: "search",
            text: "ค้นหากระทู้",
        },
        {
            id: "announcement",
            text: "สร้างประกาศ",
        },
        {
            id: "forum",
            text: "สร้างกระทู้",
        },
        {
            id: "notification",
            text: "การแจ้งเตือน",
        },
        {
            id: "profile",
            text: "ผู้ใช้",
        },
    ]
</script>

<svelte:head>
    <title>{ title }</title>
    <link rel="icon" href="/favicon.png">
</svelte:head>

<LoadingSpinner bind:isLoading />

<AuthGuard routeID={data.routeID} userType={data.userType} isValidToken={data.isValid}>
    {#if isUserSite}
        {#each tooltips as tooltip}
            {#if tooltip.id !== 'announcement' || data?.userType === UserType.TEACHER}
                <Tooltip triggeredBy="#{tooltip?.id}" shadow trigger="hover" placement="bottom" class="z-30 transition-colors ease-in duration-200 !bg-white !text-[var(--primary-color)] dark:!text-white dark:!bg-gray-700">
                    <div in:slide={{duration: 200}}>
                        {tooltip?.text}
                    </div>
                </Tooltip>
            {/if}
        {/each}

        <Popover placement="bottom" class="z-30 w-64 text-sm font-light min-[820.1px]:hidden" shadow triggeredBy="#{tooltips[1].id}" trigger="click">
            <div in:slide>
                <Input
                    id={tooltips[1].id}
                    class="w-full"
                    placeholder="ค้นหากระทู้ได้ที่นี่..."
                    size="md"
                    bind:value={searchText}
                    on:keydown={search}
                >
                    <svg slot="left" aria-hidden="true" class="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>

                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <svg slot="right" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-gray-500 dark:text-gray-400 cursor-pointer" on:click={() => searchText = ""}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </Input>
            </div>
        </Popover>

        <Popover defaultClass="overflow-hidden w-fit" placement="bottom" class="z-30 w-fit text-sm text-black text-black dark:text-white font-light" shadow triggeredBy="#{tooltips[4].id}" trigger="click">
            <div in:slide>
                <header class="relative text-center text-lg flex items-center justify-center gap-x-1 rounded-t-md py-1">
                    <span>การแจ้งเตือน</span>
                    {#if notification?.unreadNotiCount}
                        <Indicator color="red" size="lg">
                            <span class="text-white text-xs">{notification?.unreadNotiCount}</span>
                        </Indicator>
                    {/if}
                </header>

                <section>
                    {#each notification?.notiList as noti}
                        <hr class="border-gray-300 dark:border-gray-600">

                        <a class="flex items-center gap-x-3 py-2 overflow-x-hidden px-3 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-500 relative {!noti?.isRead ? 'bg-gray-200 dark:bg-gray-700' : ''}" href="/forum/{noti?.forumUUID}">
                            <img src={noti.userImageProfile} alt="" class="w-10 rounded-full">
                            {#if !noti?.isRead}
                                <Indicator color="red" size="md" border class="absolute left-11 top-3"></Indicator>
                            {/if}

                            <div class="flex flex-col">
                                <div class="text-ellipsis overflow-hidden whitespace-nowrap">
                                    <span class="text-lg">{noti.username}</span>&nbsp;
                                    <span class="text-gray-400">{noti.content}</span>
                                </div>
                                <div class="font-light text-gray-400">2 วัน</div>
                            </div>
                        </a>
                    {/each}
                </section>
            </div>
        </Popover>

        <Popover defaultClass="overflow-hidden py-2" placement="bottom" class="z-30 w-fit border text-sm text-black dark:text-white font-light -px-3" shadow triggeredBy="#{tooltips[5].id}" trigger="click">
            <div in:slide>
                <a class="flex items-center gap-x-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2" href="/profile">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    <span>โปรไฟล์</span>
                </a>

                <hr class="border-gray-200 dark:border-gray-600">

                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="flex items-center gap-x-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2" on:click={signout}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                    <span>ออกจากระบบ</span>
                </div>
            </div>
        </Popover>

        <header class="h-16 w-full overflow-hidden flex items-center bg-[var(--primary-color)] px-4 no-select fixed z-20">
            <a class="flex items-center cursor-pointer h-full gap-x-3" href="/">
                <img class="w-10 object-cover" src="/images/SU-WEBBOARD-ICON.png" alt="">
                <img class="h-6 object-cover max-[570px]:hidden" src="/images/SU-WEBBOARD-TEXT.png" alt="">
            </a>

            <nav class="flex items-center gap-x-2 ml-auto">
                <DarkMode id={tooltips[0].id} btnClass="ml-2 scale-110 text-white hover:bg-white hover:text-[var(--primary-color)] dark:hover:bg-gray-700 dark:hover:text-white rounded-full p-2 transition-all ease-in duration-200" />

                <!-- INPUT SEARCH -->
                <div class="max-[820.1px]:hidden min-w-[300px]">
                    <Input
                        class="w-full ease-in duration-200"
                        placeholder="ค้นหากระทู้ได้ที่นี่..."
                        size="md"
                        bind:value={searchText}
                        on:keydown={search}
                    >
                        <svg slot="left" aria-hidden="true" class="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>

                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <svg slot="right" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-gray-500 dark:text-gray-400 cursor-pointer" on:click={() => searchText = ""}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </Input>
                </div>

                <!-- SEARCH ICON -->
                <figure id="{tooltips[1].id}" class="rounded-full text-white hover:bg-white hover:text-[var(--primary-color)] dark:hover:bg-gray-700 dark:hover:text-white p-1 w-10 h-10 relative cursor-pointer min-[820.1px]:hidden transition-all ease-in duration-200">
                    <svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </figure>

                <!-- NEW ANNOUNCEMENT ICON -->
                {#if data?.userType === UserType.TEACHER}
                    <a id="{tooltips[2].id}" class="rounded-full text-white hover:bg-white hover:text-[var(--primary-color)] dark:hover:bg-gray-700 dark:hover:text-white p-1 w-10 h-10 relative cursor-pointer transition-all ease-in duration-200" href="/announcement">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
                        </svg>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-3 h-3 absolute left-1/2 top-1/2 -translate-x-[2px] -translate-y-[7px]">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </a>
                {/if}

                <!-- NEW FORUM ICON -->
                <a id="{tooltips[3].id}" class="rounded-full text-white hover:bg-white hover:text-[var(--primary-color)] dark:hover:bg-gray-700 dark:hover:text-white p-1 w-10 h-10 relative cursor-pointer transition-all ease-in duration-200" href="/forum">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </a>

                <!-- NOTIFICATION ICON -->
                <figure id="{tooltips[4].id}" class="rounded-full text-white hover:bg-white hover:text-[var(--primary-color)] dark:hover:bg-gray-700 dark:hover:text-white p-1 w-10 h-10 cursor-pointer -ml-1 relative transition-all ease-in duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.4" stroke="currentColor" class="w-full h-full">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                    </svg>

                    {#if notification?.unreadNotiCount}
                        <Indicator color="red" size="md" placement="top-right" class="right-1.5 top-1.5 p-2">
                            <span class="text-white text-xs">{notification?.unreadNotiCount}</span>
                        </Indicator>
                    {/if}
                </figure>

                <!-- USER AVATAR -->
                <figure id="{tooltips[5].id}" class="w-fit h-fit cursor-pointer">
                    <img
                        alt=""
                        class="rounded-full w-10 h-10"
                        src="{user?.userImageURL || defaultImageURL}"
                    />
                </figure>
            </nav>
        </header>

        <main class="relative top-16 p-4 min-h-[calc(100vh-64px*2)] overflow-x-hidden bg-gray-200 dark:bg-gray-800 ease-in duration-200">
            {#key $page.url.pathname}
                <div in:fly={{y: -20, duration: 250, delay: 100}}>
                    <slot />
                </div>
            {/key}
        </main>

        <footer class="relative top-16 h-16 flex items-center px-4 bg-[var(--primary-color)] text-white">
            <span>&copy;&nbsp;</span>su-webboard
        </footer>
    {:else}
        <slot />
    {/if}
</AuthGuard>