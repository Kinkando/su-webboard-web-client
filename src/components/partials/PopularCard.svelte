<script lang="ts">
	import CategoryBadge from "@components/badge/CategoryBadge.svelte";
	import CommentBadge from "@components/badge/CommentBadge.svelte";
	import LikeBadge from "@components/badge/LikeBadge.svelte";
	import type { Forum } from "@models/forum";
	import { timeRange } from "@util/datetime";
	import { defined } from "@util/generic";

    export let popularTopic: Forum;
</script>

<a class="rounded-lg shadow-md flex flex-col w-full h-56 cursor-pointer overflow-hidden hover:brightness-75 bg-no-repeat bg-cover brightness-20 ease-in duration-200" href="/forum/{popularTopic?.forumUUID}" style={popularTopic?.forumImages?.length ? `background-image: linear-gradient(rgba(255,255,255,0.65), rgba(255,255,255,0.65)), url('${popularTopic?.forumImages[0].url}'` : ''}>
    <div class="{!popularTopic?.forumImages?.length ? 'bg-[var(--primary-color-75)] text-black dark:bg-[var(--primary-color-125)] dark:text-white' : ''} hover:scale-105 ease-in duration-200 w-full h-full p-4 sm:p-6 flex flex-col">
        <header class="flex items-start flex-wrap gap-1 sm:h-44 h-36 overflow-y-hidden">
            {#if popularTopic?.categories}
                {#each popularTopic.categories as category}
                    <CategoryBadge categoryID={defined(category.categoryID)} categoryName={category.categoryName} categoryHexColor={category.categoryHexColor} />
                {/each}
            {/if}
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
            {#if !popularTopic.isAnonymous}
                <a href="/profile/{popularTopic.authorUUID}">
                    <img src="{popularTopic?.authorImageURL}" alt="" class="ease-in duration-200 min-w-[3rem] max-w-[3rem] min-h-[3rem] max-h-[3rem] rounded-full hover:brightness-125">
                </a>
            {:else}
                <img src="{popularTopic?.authorImageURL}" alt="" class="min-w-[3rem] max-w-[3rem] min-h-[3rem] max-h-[3rem] rounded-full">
            {/if}

            <div class="flex flex-col overflow-hidden w-full">
                {#if popularTopic?.likeCount != undefined}
                    <div class="flex items-center justify-between">
                        {#if !popularTopic.isAnonymous}
                            <a href="/profile/{popularTopic.authorUUID}" class="overflow-hidden">
                                <div class="w-full mr-2 text-md overflow-hidden text-ellipsis whitespace-nowrap hover:underline">{popularTopic?.authorName}</div>
                            </a>
                        {:else}
                            <div class="w-full mr-2 text-md overflow-hidden text-ellipsis whitespace-nowrap">{popularTopic?.authorName}</div>
                        {/if}

                        <div class="ml-auto flex items-center justify-between">
                            <LikeBadge likeCount={popularTopic?.likeCount} />
                        </div>
                    </div>
                {/if}

                {#if popularTopic?.commentCount != undefined}
                    <div class="flex items-center justify-between">
                        <div class="w-full mr-2 text-xs overflow-hidden text-ellipsis whitespace-nowrap">{timeRange(popularTopic.createdAt)}</div>
                        <div class="ml-auto flex items-center justify-between">
                            <CommentBadge commentCount={popularTopic?.commentCount} />
                        </div>
                    </div>
                {/if}
            </div>
        </footer>
    </div>
</a>