<script lang="ts">
    import { DarkMode, Indicator, Input, Popover, Tooltip } from "flowbite-svelte";
    import { slide } from 'svelte/transition';
	import { goto } from "$app/navigation";
	import { page } from '$app/stores';
	import { UserType } from "@models/auth";
	import type { User } from "@models/user";
	import { revokeToken as revokeTokenSrv } from '@services/authen';
    import { alert } from '@stores/alert';
	import notificationStore from '@stores/notification';
	import userStore from '@stores/user';
	import { getToken, revokeToken } from '@util/localstorage';
	import NotificationList from '@components/notification/NotificationList.svelte';

    export let userType: string

    let user!: User;

    $: if($userStore) { user = $userStore }
    let searchText = $page.url.searchParams.get('keyword')?.trim() || ''

    const defaultImageURL = "https://cdn-icons-png.flaticon.com/512/149/149071.png"

    const signout = async () => {
        const token = getToken()
        if (token) {
            revokeTokenSrv(token.accessToken, token.refreshToken)
        }
        revokeToken();
        await goto('login')
        alert({
            type: 'success',
            message: 'ออกจากระบบสำเร็จ!',
        })
    }
    const search = async (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            await redirect()
        }
    }
    const redirect = async() => await goto('/search?keyword='+searchText)

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

    const isAutoHide = false;
    let previousY = 0;
    let scrollY = 0;
    $: isScrollDown = scrollY > previousY;
    const scroll = (e: UIEvent & { currentTarget: EventTarget & Window }) => previousY = scrollY
</script>

<svelte:window on:scroll={scroll} bind:scrollY />

{#each tooltips.slice(1) as tooltip}
    {#if tooltip.id !== 'announcement' || userType === UserType.TEACHER}
        <Tooltip triggeredBy="#{tooltip?.id}" shadow trigger="hover" placement="bottom" class="z-30 transition-colors ease-in duration-200 !bg-white !text-[var(--primary-color)] dark:!text-white dark:!bg-gray-700">
            <div in:slide={{duration: 200}}>
                {tooltip?.text}
            </div>
        </Tooltip>
    {/if}
{/each}

<Popover placement="bottom" class="{isAutoHide && isScrollDown ? 'hidden' : ''} z-30 w-64 text-sm min-[820.1px]:hidden" shadow triggeredBy="#{tooltips[1].id}" trigger="click">
    <div in:slide>
        <Input
            id={tooltips[1].id}
            class="w-full"
            placeholder="ค้นหากระทู้ได้ที่นี่..."
            size="md"
            bind:value={searchText}
            on:keydown={search}
        >
            <svg on:click={() => redirect()} slot="left" aria-hidden="true" class="pointer-events-auto cursor-pointer w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>

            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <svg slot="right" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-gray-500 dark:text-gray-400 cursor-pointer" on:click={() => searchText = ""}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </Input>
    </div>
</Popover>

{#if $page.route.id !== '/notification'}
    <Popover defaultClass="" placement="bottom" class="{isAutoHide && isScrollDown ? 'hidden' : ''} shadow-md drop-shadow-md hide-scrollbar overflow-x-hidden z-30 max-w-full min-w-0 text-sm text-black dark:text-white" shadow triggeredBy="#{tooltips[4].id}" trigger="click">
        <div in:slide class="hide-scrollbar overflow-x-hidden">
            <NotificationList bind:notification={$notificationStore} />
        </div>
    </Popover>
{/if}

<Popover defaultClass="overflow-hidden py-2" placement="bottom" class="{isAutoHide && isScrollDown ? 'hidden' : ''} z-30 w-fit border text-sm text-black dark:text-white -px-3" shadow triggeredBy="#{tooltips[5].id}" trigger="click">
    <div in:slide>
        <a class="flex items-center gap-x-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2" href="/profile/{user.userUUID}">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            <span>โปรไฟล์</span>
        </a>

        <hr class="border-gray-200 dark:border-gray-600">

        <a class="flex items-center gap-x-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2" href="/setting">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>ตั้งค่า</span>
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

<!-- Topbar -->
<div class="h-16 w-full bg-gray-200 dark:bg-gray-800 absolute top-0 z-0 ease-in duration-200" />
<header class="transition-transform duration-200 h-16 ease-out w-full overflow-hidden flex items-center bg-[var(--primary-color)] px-4 select-none fixed z-20" style={isAutoHide && isScrollDown ? `transform: translateY(-${Math.min(scrollY, 64)}px); ${scrollY <= 64 ? 'transition: none;' : ''}` : ''}>
    <a class="flex items-center cursor-pointer h-full gap-x-3" href="/">
        <img class="w-10 object-cover" src="/images/SU-WEBBOARD-ICON.png" alt="">
        <img class="h-6 object-cover max-[570px]:hidden" src="/images/SU-WEBBOARD-TEXT.png" alt="">
    </a>

    <nav class="flex items-center gap-x-2 ml-auto">
        <DarkMode disabled class="hidden" btnClass="ml-2 scale-110 text-white hover:bg-white hover:text-[var(--primary-color)] dark:hover:bg-gray-700 dark:hover:text-white rounded-full p-2 transition-all ease-in duration-200" />

        <!-- INPUT SEARCH -->
        <div class="max-[820.1px]:hidden min-w-[300px]">
            <Input
                class="w-full ease-in duration-200"
                placeholder="ค้นหากระทู้ได้ที่นี่..."
                size="md"
                bind:value={searchText}
                on:keydown={search}
            >
                <svg on:click={() => redirect()} slot="left" aria-hidden="true" class="pointer-events-auto cursor-pointer w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>

                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <svg slot="right" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-gray-500 dark:text-gray-400 cursor-pointer" on:click={() => searchText = ""}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </Input>
        </div>

        <!-- SEARCH ICON -->
        <figure id="{tooltips[1].id}" class="rounded-full text-white hover:bg-white hover:text-[var(--primary-color)] dark:hover:bg-gray-700 dark:hover:text-white p-1 w-10 h-10 relative cursor-pointer min-[820.1px]:hidden transition-all ease-in duration-200">
            <svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </figure>

        <!-- NEW ANNOUNCEMENT ICON -->
        {#if userType === UserType.TEACHER}
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
        <figure id="{tooltips[4].id}" class="rounded-full text-white hover:bg-white hover:text-[var(--primary-color)] dark:hover:bg-gray-700 dark:hover:text-white p-1 w-10 h-10 cursor-pointer -ml-1 relative transition-all ease-in duration-200 {$page.route.id === '/notification' ? '!bg-white !text-[var(--primary-color)] !dark:bg-gray-700 !dark:text-white' : ''}">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.4" stroke="currentColor" class="w-full h-full">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>

            {#if $notificationStore?.unreadNotiCount}
                <Indicator color="red" size="md" placement="top-right" class="right-1.5 top-1.5 p-2">
                    <span class="text-white text-xs">{$notificationStore?.unreadNotiCount}</span>
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