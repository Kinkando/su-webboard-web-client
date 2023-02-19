<script lang="ts">
	import { onMount } from "svelte";
    import { page } from '$app/stores';
	import { goto } from "$app/navigation";

    onMount(() => {
        if ($page.route.id === '/admin-portal') {
            goto(`${$page.route.id}/user`)
        }
    })

    const sidebarItems = [
        {
            prefixIcon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>`,
            label: 'User',
            href: '/admin-portal/user',
        },
        {
            prefixIcon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" /><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" /></svg>`,
            label: 'Category',
            href: '/admin-portal/category',
        },
        {
            prefixIcon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" /></svg>`,
            label: 'Forum',
            href: '/admin-portal/forum',
        }
    ]
</script>

<!-- <div class="sidebar"> -->
<div class="sidebar no-select w-[225px] h-screen bg-[#40826D] z-50 fixed overflow-x-hidden overflow-y-auto">
    <a class="flex h-16 items-center px-4 py-2 cursor-pointer" href="/admin-portal/user">
        <div class="mr-2">
            <img class="w-48 object-cover" src="/images/SU-WEBBOARD-ICON.png" alt="">
        </div>
        <div>
            <img class="w-full object-cover" src="/images/SU-WEBBOARD-TEXT.png" alt="">
        </div>
    </a>
    <hr>
    {#each sidebarItems as item}
        <div class="px-2 pt-2">
            <a class="flex items-center p-2 rounded-md hover:text-[#40826D] hover:shadow-md hover:bg-white {$page.route.id === item.href ? 'text-[#40826D] shadow-md bg-white' : 'text-white '}" href={item.href}>
                <span>{@html item.prefixIcon}</span>
                <span class="ml-2">{item.label}</span>
            </a>
        </div>
    {/each}
</div>

<style lang="scss">
    .sidebar {
        -ms-overflow-style: none;  /* Internet Explorer 10+ */
        scrollbar-width: none;  /* Firefox */
        &::-webkit-scrollbar {
            display: none;  /* Safari and Chrome */
        }
    }
</style>