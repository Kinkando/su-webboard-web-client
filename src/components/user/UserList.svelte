<script lang="ts">
	import SkeletonUserCard from "@components/skeleton-load/SkeletonUserCard.svelte";
	import Pagination from "@components/ui/Pagination.svelte";
	import type { User } from "@models/user";
	import { getFollowUsers } from "@services/user";
	import UserCard from "./UserCard.svelte";

    export let userUUID: string;
    export let type: 'follower' | 'following';

    let currentPage = 1;
    let limit = 10;
    let total = 0;
    let users: User[] = []
    let isLoading = true;

    const fetchData = async() => await getFollowUsers(userUUID, type, (currentPage-1)*limit, limit)

    $: (currentPage || limit) && changePage()
    const changePage = async() => {
        isLoading = true;
        const res = await fetchData();
        users = res?.data || [];
        total = res?.total || 0;
        isLoading = false;
    }
</script>

{#key total}
    {#if isLoading}
        {#each Array(limit) as _}
            <SkeletonUserCard />
        {/each}
    {:else}
        {#if users?.length}
            {#each users as user}
                <UserCard {user} />
            {/each}
            <Pagination bind:currentPage bind:total bind:limit />
        {:else}
            <div class="mt-10 mb-6">
                <img src="/images/empty.png" alt="" class="m-auto w-48">
                <div class="text-center mt-4 text-black dark:text-white">ไม่พบข้อมูล</div>
            </div>
        {/if}
    {/if}
{/key}