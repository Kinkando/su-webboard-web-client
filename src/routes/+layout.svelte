<script lang="ts">
    import "../app.postcss";
	import { onMount } from "svelte";
	import { fly } from 'svelte/transition';
    import { page } from '$app/stores';
	import { goto } from "$app/navigation";
	import { Indicator, Input, Popover } from "flowbite-svelte";
    import type { Notification } from "@models/notification";
	import type { User } from "@models/user";
	import { getNotiList } from "@services/notification";
	import { getUserProfile } from "@services/user";

    $: title = (() => {
        switch ($page.route.id!) {
            // Admin portal page
            case "/admin-portal": return "ADMIN PORTAL | Home"
            case "/admin-portal/user": return "ADMIN PORTAL | Manage User"
            case "/admin-portal/category": return "ADMIN PORTAL | Manage Category"
            case "/admin-portal/forum": return "ADMIN PORTAL | Manage Forum"

            // General user page
            case "/": return "SU Webboard | Home"
            case "/login": return "SU Webboard | Sign in"
            case "/profile": return "SU Webboard | Profile"
            case "/new-forum": return "SU Webboard | New Forum"

            // List page
            case "/category/[categoryUUID]": return "SU Webboard | Category List"
            case "/announcement": return "SU Webboard | Announcement List"
            case "/popular": return "SU Webboard | Popular List"
            case "/search": return "SU Webboard | Search"

            // Forum page
            case "/announcement/[forumUUID]": return "SU Webboard | Announcement Forum"
            case "/forum/[forumUUID]": return "SU Webboard | Forum Detail"
        }
    })()
    $: isUserSite = $page.route.id?.indexOf("/admin-portal") == -1 && $page.route.id! != "/login";
    const defaultImageURL = "https://cdn-icons-png.flaticon.com/512/149/149071.png"

    let searchText = "";

    const signout = () => {
        goto("/login")
    }

    let notification: Notification;
    let user: User;

    onMount(async () => {
        if (isUserSite) {
            user = await getUserProfile()
            notification = await getNotiList()
        }
    })

    const search = (event: KeyboardEvent) => {
        if (event.key === 'Enter' && searchText) {
            goto('/search?keyword='+searchText)
        }
    }
</script>

<svelte:head>
    <title>{ title }</title>
    <link rel="icon" href="/favicon.png">
</svelte:head>

{#if isUserSite}
    <Popover placement="bottom" class="z-30 w-64 text-sm font-light min-[720.1px]:hidden" triggeredBy="#search" trigger="click">
        <Input
            id="search"
            class="w-full"
            placeholder="Search topics ..."
            size="md"
            bind:value={searchText}
            on:keydown={search}
        >
            <svg slot="left" aria-hidden="true" class="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>

            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <svg slot="right" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-gray-500 dark:text-gray-400 cursor-pointer" on:click={() => searchText = ""}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </Input>
    </Popover>

    <Popover defaultClass="overflow-hidden w-fit" placement="bottom" class="z-30 w-fit text-sm font-light" triggeredBy="#notification" trigger="click">
        <header class="relative text-center text-lg flex items-center justify-center gap-x-1 rounded-t-md py-1">
            <span class="">Notification</span>
            {#if notification?.unreadNotiCount}
                <Indicator color="red" size="lg">
                    <span class="text-white text-xs">{notification?.unreadNotiCount}</span>
                </Indicator>
            {/if}
        </header>
        <section>
            {#each notification?.notiList as noti}
                <hr class="border-gray-300">

                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="flex items-center gap-x-3 py-2 overflow-x-hidden px-3 cursor-pointer hover:bg-gray-300 relative {!noti?.isRead ? 'bg-gray-200' : ''}" on:click={() => goto('/forum/'+noti?.forumUUID)}>
                    <img src={noti.userImageProfile} alt="" class="w-10 rounded-50">
                    {#if !noti?.isRead}
                        <Indicator color="red" size="md" border class="absolute left-11 top-3"></Indicator>
                    {/if}
                    <div class="flex flex-col">
                        <div class="text-ellipsis overflow-hidden whitespace-nowrap">
                            <span class="text-lg">{noti.username}</span>&nbsp;
                            <span class="text-gray-400">{noti.content}</span>
                        </div>
                        <div class="font-light text-gray-400">2 days ago</div>
                    </div>
                </div>
            {/each}
        </section>
    </Popover>

    <Popover defaultClass="overflow-hidden py-2" placement="bottom" class="z-30 w-fit text-sm font-light -px-3" triggeredBy="#profile" trigger="click">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <nav class="flex items-center gap-x-3 cursor-pointer hover:bg-gray-200 px-3 py-2" on:click={() => goto("/profile")}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            <span>Profile</span>
        </nav>

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <nav class="flex items-center gap-x-3 cursor-pointer hover:bg-gray-200 px-3 py-2" on:click={signout}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            <span>Logout</span>
        </nav>
    </Popover>

    <header class="h-16 w-full overflow-hidden flex items-center bg-[#40826D] px-4 no-select fixed z-20">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <figure class="flex items-center cursor-pointer h-full gap-x-3" on:click={() => goto("/")}>
            <img class="w-10 object-cover" src="/images/SU-WEBBOARD-ICON.png" alt="">
            <img class="h-6 object-cover max-[450px]:hidden" src="/images/SU-WEBBOARD-TEXT.png" alt="">
        </figure>

        <nav class="flex items-center gap-x-3 ml-auto">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <figure id="search" class="w-8 h-8 relative cursor-pointer min-[720.1px]:hidden">
                <svg class="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </figure>

            <div class="max-[720.1px]:hidden min-w-[300px]">
                <Input
                    id="search"
                    class="w-full"
                    placeholder="Search topics ..."
                    size="md"
                    bind:value={searchText}
                    on:keydown={search}
                >
                    <svg slot="left" aria-hidden="true" class="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>

                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <svg slot="right" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-gray-500 dark:text-gray-400 cursor-pointer" on:click={() => searchText = ""}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </Input>
            </div>

            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <figure class="w-8 h-8 relative cursor-pointer" on:click={() => goto("/new-forum")}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full text-white">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                </svg>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </figure>

            <figure id="notification" class="w-8 h-8 cursor-pointer -ml-1 relative">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.4" stroke="currentColor" class="w-full h-full text-white">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>

                {#if notification?.unreadNotiCount}
                    <Indicator color="red" size="md" placement="top-right" class="right-1 top-0.5 p-2">
                        <span class="text-white text-xs">{notification?.unreadNotiCount}</span>
                    </Indicator>
                {/if}
            </figure>

            <figure class="w-fit h-fit cursor-pointer" id="profile">
                <img
                    alt=""
                    class="rounded-50 w-10"
                    src="{user?.userImageURL ? user.userImageURL : defaultImageURL}"
                />
            </figure>
        </nav>
    </header>

    <main class="relative top-16 p-4 min-h-[calc(100vh-64px*2)] overflow-x-hidden">
        {#key $page.url.pathname}
            <div in:fly={{y: -20, duration: 250, delay: 100}}>
                <slot />
            </div>
        {/key}
    </main>

    <footer class="relative top-16 h-16 flex items-center px-4 bg-[#40826D] text-white">
        <span>&copy;&nbsp;</span>su-webboard
    </footer>
{:else}
    <slot />
{/if}
