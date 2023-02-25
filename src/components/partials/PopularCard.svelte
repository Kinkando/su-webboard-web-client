<script lang="ts">
	import CategoryBadge from "@components/shared/CategoryBadge.svelte";
	import type { Forum } from "@models/forum";

    export let popularTopic: Forum;
</script>

<a class="rounded-lg shadow-md flex flex-col w-full h-56 cursor-pointer overflow-hidden hover:brightness-75 bg-no-repeat bg-cover brightness-20" href="/forum/{popularTopic?.forumUUID}" style={popularTopic?.forumImageURL ? `background-image: linear-gradient(rgba(255,255,255,0.65), rgba(255,255,255,0.65)), url('${popularTopic?.forumImageURL}'` : ''}>
    <div class="{!popularTopic?.forumImageURL ? 'bg-[var(--primary-color-75)] text-black dark:bg-[var(--primary-color-125)] dark:text-white' : ''} hover:scale-105 ease-in duration-200 w-full h-full p-4 sm:p-6 flex flex-col">
        <header class="flex items-start flex-wrap gap-1 sm:h-44 h-36 overflow-y-hidden">
            {#each popularTopic?.categories as category}
                <CategoryBadge {...category} />
            {/each}
            <!-- {#each popularTopic?.categories?.slice(0, Math.min(3, popularTopic?.categories?.length)) as category} -->
            <!--
            {#if popularTopic?.categories?.length > 3}
                <CategoryBadge categoryID={0} categoryName={"..."} categoryHexColor={"#799"} />
            {/if}
            -->
        </header>

        <section class="my-2 h-full flex items-end">
            <div class="text-xl font-bold overflow-hidden text-ellipsis line-clamp-2">{popularTopic?.title}</div>
        </section>

        <footer class="flex items-center gap-x-3">
            <img src="{popularTopic?.authorImageURL}" alt="" class="w-12">
            <div class="flex flex-col overflow-hidden w-full">
                <div class="flex items-center justify-between">
                    <div class="w-full mr-2 text-md overflow-hidden text-ellipsis whitespace-nowrap">{popularTopic?.authorName}</div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                    <span class="ml-1 text-xs mr-auto">{popularTopic?.likeCount}</span>
                </div>

                <div class="flex items-center justify-between">
                    <div class="w-full mr-2 text-xs overflow-hidden text-ellipsis whitespace-nowrap">2 ชั่วโมง</div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                    </svg>
                    <span class="ml-1 text-xs mr-auto">{popularTopic?.commentCount}</span>
                </div>
            </div>
        </footer>
    </div>
</a>