<script lang="ts">
	import SkeletonForumList from "@components/skeleton-load/SkeletonForumList.svelte";
	import Pagination from "@components/ui/Pagination.svelte";
    import type { Announcement } from "@models/announcement";
	import AnnouncementCard from "./AnnouncementCard.svelte";

    let total = 0;
    let announcements: Announcement[] = [];
    let isLoading = true;

    export let page: number;
    export let limit = 10;
    export let fetchData: () => Promise<{ data: Announcement[], total: number }>;

    $: (page || limit) && changePage()
    const changePage = async() => {
        isLoading = true;
        const res = await fetchData();
        announcements = res.data;
        total = res.total;
        isLoading = false;
    }
</script>

{#key total}
    {#if isLoading}
        <SkeletonForumList count={limit} announcement />
    {:else}
        {#if announcements?.length}
            {#each announcements as announcement}
                <div class="mb-4">
                    <AnnouncementCard {announcement} />
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