<script lang="ts">
	import { goto } from '$app/navigation';
    import { page } from '$app/stores';
	import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";
	import { fly } from 'svelte/transition';

    const rootPath = "/admin-portal"
    const sidebarItems = [
        {
            prefixIcon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>`,
            label: 'Home',
            href: `${rootPath}`,
        },
        {
            prefixIcon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>`,
            label: 'User',
            href: `${rootPath}/user`,
        },
        {
            prefixIcon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" /><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" /></svg>`,
            label: 'Category',
            href: `${rootPath}/category`,
        },
        {
            prefixIcon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" /></svg>`,
            label: 'Forum',
            href: `${rootPath}/forum`,
        }
    ]

    $: currentRoute = $page.route.id!;

    let isSidebarExpand = false;

    const signout = async () => await fetch("/api/token/revoke", { method: "POST" });

    const hideSidebar = () => isSidebarExpand = false
</script>

<svelte:window on:resize={() => isSidebarExpand = false}/>

<!-- Sidebar -->
{#key isSidebarExpand}
    <aside class="sidebar no-select w-[225px] h-screen bg-[#40826D] z-50 fixed overflow-x-hidden overflow-y-auto max-[1000.1px]:hidden [&.active]:block {isSidebarExpand ? 'active' : ''}" transition:fly|local={{x: -225, duration: 250, opacity: 1}}>
        <a class="flex h-16 items-center px-4 py-2 cursor-pointer" on:click={hideSidebar} href={rootPath}>
            <figure class="mr-2">
                <img class="w-48 object-cover" src="/images/SU-WEBBOARD-ICON.png" alt="">
            </figure>
            <figure>
                <img class="w-full object-cover" src="/images/SU-WEBBOARD-TEXT.png" alt="">
            </figure>
        </a>
        <hr>

        {#each sidebarItems as item}
            <nav class="px-2 pt-2">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <a class="transition-all duration-200 flex items-center p-2 rounded-md hover:text-[#40826D] hover:shadow-md hover:bg-gray-200 {currentRoute === item.href ? '!text-[#40826D] shadow-md !bg-white' : 'text-white '}" on:click={hideSidebar} href={item.href}>
                    <span>{@html item.prefixIcon}</span>
                    <span class="ml-2">{item.label}</span>
                </a>
            </nav>
        {/each}

        <nav class="bottom-nav">
            <div class="p-2">
                <a class="transition-all duration-200 flex items-center p-2 rounded-md hover:text-[#40826D] hover:shadow-md hover:bg-white text-white cursor-pointer" on:click={signout} href="/login">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                    </span>
                    <span class="ml-2">Logout</span>
                </a>
            </div>
        </nav>
    </aside>
{/key}

<!-- Page Container -->
<main class="relative min-[1000.1px]:ml-[225px] max-[1000.1px]:top-16 h-full overflow-hidden">
    <nav class="h-16 flex items-center px-4 max-[1000.1px]:hidden">
        <Breadcrumb aria-label="Default breadcrumb example">
            <BreadcrumbItem href="{rootPath}" home>Home</BreadcrumbItem>
            {#if currentRoute.toString().lastIndexOf("/") > 0}
                <BreadcrumbItem>{ sidebarItems.find(item => currentRoute === item.href)?.label }</BreadcrumbItem>
            {/if}
        </Breadcrumb>
    </nav>

    <header class="fixed w-full top-0 min-[1000.1px]:hidden h-16 flex items-center px-4 text-2xl bg-gray-200 shadow-md">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <span class="float-left flex items-center sticky top-0 z-40 cursor-pointer" on:click={() => isSidebarExpand = !isSidebarExpand}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        </span>
        <span class="ml-2">{ sidebarItems.find(item => currentRoute === item.href)?.label }</span>
    </header>

    {#key currentRoute}
        <section class="p-4 min-h-[calc(100vh-64px*2)]" in:fly={{y: -20, duration: 250, delay: 100}}>
            <slot />
        </section>
    {/key}

    <footer class="h-16 flex items-center px-4 bg-gray-100">
        <span>&copy;&nbsp;</span>su-webboard
    </footer>
</main>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<article class="top-0 bg-black w-screen h-screen brightness-50 z-40 fixed opacity-50 {isSidebarExpand ? '' : 'hidden'}" on:click={() => isSidebarExpand = false}></article>

<style lang="scss">
    .sidebar {
        -ms-overflow-style: none;  /* Internet Explorer 10+ */
        scrollbar-width: none;  /* Firefox */
        &::-webkit-scrollbar {
            display: none;  /* Safari and Chrome */
        }
    }

    @media screen and (min-height: 315px) {
        .bottom-nav {
            @apply bottom-0 absolute w-full;
        }
    }
</style>