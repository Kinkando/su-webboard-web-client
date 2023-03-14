<script lang="ts">
    import "../app.postcss";
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { browser } from "$app/environment";
	import { afterNavigate, beforeNavigate } from "$app/navigation";
    import { page } from '$app/stores';
	import Topbar from "@components/layout/Topbar.svelte";
	import LoadingSpinner from '@components/spinner/LoadingSpinner.svelte';
	import AuthGuard from '@middleware/AuthGuard.svelte';
	import { getNotiList } from "@services/notification";
	import { getUserProfile } from "@services/user";
    import notificationStore from '@stores/notification'
    import userStore from '@stores/user'
	import { getUserType } from "@util/localstorage";

    $: title = (() => {
        const adminPortalPrefix = "ADMIN PORTAL | "
        const generalUserPrefix = "SU Webboard | "

        switch ($page.route.id!) {
            // Admin portal page
            case "/admin-portal": return adminPortalPrefix + "Home"
            case "/admin-portal/category": return adminPortalPrefix + "Manage Category"
            case "/admin-portal/forum": return adminPortalPrefix + "Manage Forum"
            case "/admin-portal/student": return adminPortalPrefix + "Manage Student"
            case "/admin-portal/teacher": return adminPortalPrefix + "Manage Teacher"

            // General user page
            case "/": return generalUserPrefix + "Home"
            case "/login": return generalUserPrefix + "Sign in"
            case "/forgot-password": return generalUserPrefix + "Forgot Password"
            case "/reset-password": return generalUserPrefix + "Reset Password"
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
    $: isUserSite = !$page.url.pathname?.startsWith("/admin-portal") && !["/login", "/forgot-password", "/reset-password"].includes($page.url.pathname!);

    let userType: string;
    let isValidToken: boolean;
    $: if($page.url.pathname && browser) {
        const local = getUserType()
        userType = local.userType
        isValidToken = local.isValid
    }

    let isLoading = true;
    onMount(async() => {
        isLoading = false;
        if (isUserSite) {
            userStore.set(await getUserProfile())
            notificationStore.set(await getNotiList())
        }
    })
    beforeNavigate(() => isLoading = true)
    afterNavigate(() => isLoading = false)
</script>

<svelte:head>
    <title>{ title }</title>
    <link rel="icon" href="/favicon.png">
</svelte:head>

<LoadingSpinner bind:isLoading />

{#key $page.url.pathname}
    <AuthGuard bind:routeID={$page.url.pathname} bind:userType bind:isValidToken>
        {#if isUserSite}
            <Topbar bind:userType />

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
                <span>&copy;&nbsp;</span>su-webboard - 2023
            </footer>
        {:else}
            <slot />
        {/if}
    </AuthGuard>
{/key}