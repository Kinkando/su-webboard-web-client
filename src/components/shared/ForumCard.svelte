<script lang="ts">
	import CategoryBadge from "@components/badge/CategoryBadge.svelte";
	import CommentBadge from "@components/badge/CommentBadge.svelte";
	import LikeBadge from "@components/badge/LikeBadge.svelte";
	import TimeBadge from "@components/badge/TimeBadge.svelte";
    import type { Forum } from "@models/forum";

    export let forum: Forum;
    const rankingColor = (() => {
        switch (forum?.ranking) {
            case 1: return "background-color: #FFD700; color: #000"
            case 2: return "background-color: #C0C0C0; color: #000"
            case 3: return "background-color: #b87333; color: #000"
            default: return ""
        }
    })()
</script>

<a class="bg-white text-black dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-900 cursor-pointer p-4 sm:p-6 shadow-md drop-shadow-md rounded-md ease-in duration-200 w-full h-full flex gap-x-4" href="/forum/{forum?.forumUUID}">
    {#if forum?.ranking}
        <div class="flex items-center -mr-2">
            <div class="w-8 h-8 p-1 rounded-full text-center" style={rankingColor}>
                {forum?.ranking}
            </div>
        </div>
    {/if}
    <img src={forum?.authorImageURL} alt="" class="w-16 h-16">
    <section class="w-full max-w-full overflow-hidden flex flex-col gap-y-1">
        <div class="font-bold text-lg overflow-hidden text-ellipsis whitespace-nowrap">{forum?.title}</div>
        <div class="text-md overflow-hidden text-ellipsis whitespace-nowrap">{forum?.authorName}</div>
        <TimeBadge text="2 ชั่วโมง" />
        <div class="flex flex-wrap gap-1 w-full">
            {#each forum?.categories as category}
                <CategoryBadge categoryHexColor={category?.categoryHexColor} categoryID={category?.categoryID} categoryName={category?.categoryName} />
            {/each}
            <div class="ml-auto">
                <div class="flex items-center">
                    <LikeBadge likeCount={forum?.likeCount} />
                    <div class="mr-2"></div>
                    <CommentBadge commentCount={forum?.commentCount} />
                </div>
            </div>
        </div>
    </section>
</a>