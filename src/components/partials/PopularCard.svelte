<script lang="ts">
	import { goto } from "$app/navigation";
	import CategoryBadge from "@components/shared/CategoryBadge.svelte";
	import type { Forum } from "@models/forum";
	import { onMount } from "svelte";

    export let popularTopic: Forum;

    let element: HTMLDivElement;

    onMount(() => {
        if (popularTopic?.forumImageURL) {
            element.style.backgroundImage = `linear-gradient(rgba(255,255,255,0.65), rgba(255,255,255,0.65)), url("${popularTopic?.forumImageURL}")`
        }
    })
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div bind:this={element} class="bg-[#aad4c7] dark:bg-gray-800 text-black dark:text-gray-400 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md flex flex-col w-full h-56 cursor-pointer overflow-hidden hover:brightness-75 bg-no-repeat bg-cover brightness-20" on:click={() => goto(`/forum/${popularTopic?.forumUUID}`)}>
    <div class="hover:scale-105 ease-in duration-200 w-full h-full p-4 sm:p-6 flex flex-col">
        <header class="flex items-center gap-x-1">
            {#each popularTopic?.categories as category}
                <CategoryBadge name={category?.categoryName} hexColor={category?.categoryHexColor} />
            {/each}
        </header>
        <section class="my-2 h-full flex items-end">
            <div class="text-xl overflow-hidden text-ellipsis line-clamp-2">{popularTopic?.title}</div>
        </section>
        <footer class="flex items-center gap-x-3">
            <img src="{popularTopic?.authorImageURL}" alt="" class="w-12">
            <div class="flex flex-col">
                <span class="text-md">{popularTopic?.authorName}</span>
                <span class="text-xs">2 hours ago</span>
            </div>
        </footer>
    </div>
</div>