<script lang="ts">
	import { fade, fly } from 'svelte/transition';
    import { page } from '$app/stores';
	import { revokeToken as revokeTokenSrv } from '@services/authen';
    import { alert } from '@stores/alert';
	import { getToken, revokeToken } from '@util/localstorage';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

    export let rootPath: string;
    export let sidebarItems: { prefixIcon: string, label: string, href: string }[]
    export let isSidebarExpand: boolean;

    $: currentRoute = $page.route.id!;
    const signout = async () => {
        onMount(() => {
            const token = getToken()
            if (token) {
                revokeTokenSrv(token.accessToken, token.refreshToken)
            }
            revokeToken();
            // await goto('login');
            location.href = "/login";
            alert({
                type: 'success',
                message: 'ออกจากระบบสำเร็จ!',
            })
        })
    }
    const hideSidebar = () => isSidebarExpand = false
</script>

<svelte:window on:resize={() => isSidebarExpand = false}/>

{#key isSidebarExpand}
    <aside class="hide-scrollbar select-none w-[225px] h-screen bg-[var(--primary-color)] z-50 fixed overflow-x-hidden overflow-y-auto max-[1000.1px]:hidden [&.active]:block {isSidebarExpand ? 'active' : ''}" transition:fly|local={{x: -225, duration: 250, opacity: 1}}>
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
                <a class="transition-all duration-200 flex items-center p-2 rounded-md hover:text-[var(--primary-color)] hover:shadow-md hover:bg-gray-200 {currentRoute === item.href ? '!text-[var(--primary-color)] shadow-md !bg-white' : 'text-white '}" on:click={hideSidebar} href={item.href}>
                    <span>{@html item.prefixIcon}</span>
                    <span class="ml-2">{item.label}</span>
                </a>
            </nav>
        {/each}

        <nav class="bottom-nav">
            <div class="p-2">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="transition-all duration-200 flex items-center p-2 rounded-md hover:text-[var(--primary-color)] hover:shadow-md hover:bg-white text-white cursor-pointer" on:click={signout}>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                    </span>
                    <span class="ml-2">ออกจากระบบ</span>
                </div>
            </div>
        </nav>
    </aside>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <article transition:fade|local class="ease-in duration-200 top-0 bg-black w-screen h-screen brightness-50 z-40 fixed opacity-50 {isSidebarExpand ? '' : 'hidden'}" on:click={() => isSidebarExpand = false}></article>
{/key}

<style lang="scss">
    @media screen and (min-height: 362px) {
        .bottom-nav {
            @apply bottom-0 absolute w-full;
        }
    }
</style>