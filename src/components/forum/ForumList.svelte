<script lang="ts">
	import SkeletonForumList from "@components/skeleton-load/SkeletonForumList.svelte";
	import Pagination from "@components/ui/Pagination.svelte";
    import type { Forum } from "@models/forum";
	import ForumCard from "./ForumCard.svelte";

    let total = 0;
    let forums: Forum[] = [];
    let isLoading = true;

    export let search = "";
    export let page: number;
    export let limit = 10;
    export let ranking = false;
    export let favorite = false;
    export let fetchData: () => Promise<{ data: Forum[], total: number }>;

    $: (page || limit || search) && changePage()
    const changePage = async() => {
        isLoading = true;
        const res = await fetchData();
        forums = res.data;
        total = res.total;
        isLoading = false;
    }
</script>

{#key total}
    {#if isLoading}
        <SkeletonForumList count={limit} {ranking} />
    {:else}
        {#if forums?.length}
            {#each forums as forum}
                <div class="mb-4">
                    <ForumCard {forum} {favorite} />
                </div>
            {/each}
        {:else}
            <div class="mt-10 mb-6">
                <img src="/images/empty.png" alt="" class="m-auto w-48">
                <div class="text-center mt-4 text-black dark:text-white">ไม่พบข้อมูล</div>
            </div>
        {/if}
    {/if}
    <Pagination bind:currentPage={page} bind:total bind:limit />
{/key}