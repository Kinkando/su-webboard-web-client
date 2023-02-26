<script lang="ts">
	import type { Forum } from "@models/forum";
	import ForumCard from "./ForumCard.svelte";

    let forums: Forum[] = [];
    let total = 0;

    export let page: number;
    export let limit = 10;
    export let fetchData: () => Promise<{ data: Forum[], total: number }>;

    $: (page || limit) && changePage()
    const changePage = async() => {
        const res = await fetchData();
        forums = res.data;
        total = res.total;
    }
</script>

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