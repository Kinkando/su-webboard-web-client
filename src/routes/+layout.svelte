<script lang="ts">
    import "../app.postcss";
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
    import { page } from '$app/stores';
	import { afterNavigate, beforeNavigate, goto } from "$app/navigation";
	import LoadingSpinner from '@components/spinner/LoadingSpinner.svelte';
	import AuthGuard from '@middleware/AuthGuard.svelte';
	import Topbar from "@components/layout/Topbar.svelte";
	import { getUserType } from "@util/localstorage";
	import { browser } from "$app/environment";

    export let data: any;

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

    let userType: string;
    let isValidToken: boolean;
    $: if($page.url.pathname && browser) {
        const local = getUserType()
        userType = local.userType
        isValidToken = local.isValid
    }
</script>

<svelte:head>
    <title>{ title }</title>
    <link rel="icon" href="/favicon.png">
</svelte:head>

<LoadingSpinner bind:isLoading />

<!-- <AuthGuard bind:routeID={data.routeID} bind:userType={data.userType} bind:isValidToken={data.isValid}> -->
{#key $page.url.pathname}
    <AuthGuard bind:routeID={data.routeID} bind:userType bind:isValidToken>
        {#if isUserSite}
            <Topbar bind:data />

            <article class="fixed top-0 w-screen h-screen bg-gray-200 dark:bg-gray-800 ease-in duration-200 transition-colors overflow-hidden" />
            <main class="relative top-16 min-h-[calc(100vh-64px*2)] overflow-x-hidden">
                {#key $page.url.pathname}
                    <div class="p-4 bg-gray-200 dark:bg-gray-800 ease-in duration-200">
                        <div in:fly={{y: -20, duration: 250, delay: 100}}>
                            <slot />
                        </div>
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
{/key}