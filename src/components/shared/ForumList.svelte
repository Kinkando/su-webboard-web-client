<script lang="ts">
	import SkeletonForumList from "@components/skeleton-load/SkeletonForumList.svelte";
    import type { Forum } from "@models/forum";
	import ForumCard from "./ForumCard.svelte";

    let forums: Forum[] = [];
    let total = 0;
    let isLoading = true;

    export let page: number;
    export let limit = 10;
    export let isRanking = false;
    export let fetchData: () => Promise<{ data: Forum[], total: number }>;

    $: (page || limit) && changePage()
    const changePage = async() => {
        isLoading = true;
        const res = await fetchData();
        forums = res.data;
        total = res.total;
        isLoading = false;
    }
</script>

{#if isLoading}
    <SkeletonForumList count={limit} ranking={isRanking} />
{:else}
    {#each forums as forum}
        <div class="my-4">
            <ForumCard {forum}></ForumCard>
        </div>
    {:else}
        <div class="mt-10">
            <img src="/images/empty.png" alt="" class="m-auto w-48">
            <div class="text-center mt-4 text-black dark:text-white">ไม่พบข้อมูล</div>
        </div>
    {/each}
{/if}