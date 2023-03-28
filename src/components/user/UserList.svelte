<script lang="ts">
	import SkeletonUserCard from "@components/skeleton-load/SkeletonUserCard.svelte";
	import Pagination from "@components/ui/Pagination.svelte";
	import type { User } from "@models/user";
	import { getFollowUsers, searchUsers } from "@services/user";
	import { Input } from "flowbite-svelte";
	import UserCard from "./UserCard.svelte";

    export let userUUID: string = "";
    export let type: 'follower' | 'following' | 'search';

    let search = "";
    let currentPage = 1;
    let limit = 10;
    let total = 0;
    let users: User[] = []
    let isLoading = true;

    const fetchData = async() => {
        const offset = (currentPage-1)*limit;
        if (type !== 'search') {
            return await getFollowUsers(userUUID, type, offset, limit)
        }
        return await searchUsers(search.trim(), offset, limit)
    }

    $: (currentPage || limit) && changePage()
    const changePage = async() => {
        isLoading = true;
        const res = await fetchData();
        users = res?.data || [];
        total = res?.total || 0;
        isLoading = false;
    }
</script>

{#if type === 'search'}
    <Input
        class="w-full ease-in duration-200"
        placeholder="ค้นหาผู้ใช้งาน..."
        size="md"
        bind:value={search}
        on:keydown={event => {
            if (event.key === 'Enter') {
                changePage()
            }
        }}
    >
        <svg on:click={() => changePage()} slot="left" aria-hidden="true" class="pointer-events-auto cursor-pointer w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <svg slot="right" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-gray-500 dark:text-gray-400 cursor-pointer" on:click={() => search = ""}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
    </Input>
{/if}

{#key total}
    {#if isLoading}
        {#each Array(limit) as _}
            <SkeletonUserCard button={type !== 'search'} />
        {/each}
    {:else}
        {#if users?.length}
            {#each users as user}
                <UserCard {user} />
            {/each}
        {:else}
            <div class="mt-10 mb-6">
                <img src="/images/empty.png" alt="" class="m-auto w-48">
                <div class="text-center mt-4 text-black dark:text-white">ไม่พบข้อมูล</div>
            </div>
        {/if}
    {/if}
    <Pagination bind:currentPage bind:total bind:limit />
{/key}