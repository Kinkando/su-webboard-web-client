<script lang="ts">
	import CategoryBadge from "@components/badge/CategoryBadge.svelte";
	import CommentBadge from "@components/badge/CommentBadge.svelte";
	import LikeBadge from "@components/badge/LikeBadge.svelte";
	import TimeBadge from "@components/badge/TimeBadge.svelte";
    import type { Forum } from "@models/forum";
	import { timeRange } from "@util/datetime";
	import { defined } from "@util/generic";

    export let forum: Forum;
    export let announcement = false;
    const rankingColor = (() => {
        switch (forum?.ranking) {
            case 1: return "background-color: #FFD700 !important; color: #000 !important"
            case 2: return "background-color: #C0C0C0 !important; color: #000 !important"
            case 3: return "background-color: #b87333 !important; color: #000 !important"
            default: return ""
        }
    })()

    const time = (() => timeRange(forum?.createdAt))()
</script>

<a class="bg-white text-black dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-900 cursor-pointer p-4 sm:p-6 shadow-md drop-shadow-md rounded-md ease-in duration-200 w-full h-full flex gap-x-4" href={!announcement ? `/forum/${forum?.forumUUID}`: `/announcement/${forum?.forumUUID}`}>
    <div class="relative w-fit h-fit">
        {#if forum?.ranking}
            <div class="flex items-center -mr-2 absolute bottom-0 right-0">
                <div class="w-6 h-6 p-1 rounded-full flex items-center justify-center !bg-gray-200 dark:!bg-gray-800" style={rankingColor}>
                    {forum?.ranking}
                </div>
            </div>
        {/if}
        <img src={forum?.authorImageURL} alt="" class="min-w-[4rem] max-w-[4rem] rounded-full">
    </div>
    <section class="w-full max-w-full overflow-hidden flex flex-col gap-y-1">
        <div class="font-bold text-lg overflow-hidden text-ellipsis whitespace-nowrap">{forum?.title}</div>
        <div class="text-md overflow-hidden text-ellipsis whitespace-nowrap">{forum?.authorName}</div>
        <TimeBadge text={time} />
        {#if forum?.categories}
            <div class="flex flex-wrap gap-1 w-full">
                {#each forum?.categories as category}
                    <CategoryBadge categoryHexColor={category?.categoryHexColor} categoryID={defined(category?.categoryID)} categoryName={category?.categoryName} />
                {/each}
                {#if forum?.likeCount !== undefined && forum?.commentCount !== undefined}
                    <div class="ml-auto">
                        <div class="flex items-center">
                            <LikeBadge uuid={forum?.forumUUID} isLike={undefined} likeCount={forum?.likeCount} />
                            <div class="mr-2" />
                            <CommentBadge commentCount={forum?.commentCount} />
                        </div>
                    </div>
                {/if}
            </div>
        {/if}
    </section>
</a>