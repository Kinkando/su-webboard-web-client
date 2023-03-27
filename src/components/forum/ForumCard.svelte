<script lang="ts">
	import CategoryBadge from "@components/badge/CategoryBadge.svelte";
	import CommentBadge from "@components/badge/CommentBadge.svelte";
	import LikeBadge from "@components/badge/LikeBadge.svelte";
	import TimeBadge from "@components/badge/TimeBadge.svelte";
    import type { Forum } from "@models/forum";
	import { favoriteForum } from "@services/forum";
	import { timeRange } from "@util/datetime";
	import { defined } from "@util/generic";
	import { Button } from "flowbite-svelte";

    export let favorite = false;
    export let forum: Forum;
    const rankingColor = (() => {
        switch (forum?.ranking) {
            case 1: return "background-color: #FFD700 !important; color: #000 !important"
            case 2: return "background-color: #C0C0C0 !important; color: #000 !important"
            case 3: return "background-color: #b87333 !important; color: #000 !important"
            default: return ""
        }
    })()

    let anchorElement: HTMLAnchorElement
    let button: HTMLDivElement

    const favoriteForumAction = async() => {
        if (favorite) {
            forum.isFavorite = !forum.isFavorite
            await favoriteForum(forum.forumUUID, forum.isFavorite)
        }
    }

    const clickAnchor = (event: MouseEvent & { currentTarget: EventTarget & HTMLAnchorElement }) => {
        if (favorite) {
            const elm = event.target as HTMLElement
            if (elm.parentElement === button) {
                event.preventDefault();
            }
        }
    }

    const time = (() => timeRange(forum?.createdAt))()
</script>

<a bind:this={anchorElement} on:click={clickAnchor} class="bg-white text-black dark:bg-gray-600 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer p-4 sm:p-6 shadow-md drop-shadow-md rounded-md ease-in duration-200 w-full h-full flex gap-x-4" href={`/forum/${forum?.forumUUID}`}>
    <div class="relative w-fit h-fit">
        {#if forum?.ranking}
            <div class="flex items-center -mr-2 absolute bottom-0 right-0 z-10">
                <div class="w-6 h-6 p-1 rounded-full flex items-center justify-center !bg-gray-200 dark:!bg-gray-800" style={rankingColor}>
                    {forum?.ranking}
                </div>
            </div>
        {/if}

        {#if !forum.isAnonymous}
            <a href="/profile/{forum.authorUUID}">
                <img src="{forum?.authorImageURL}" alt="" class="z-0 ease-in duration-200 min-w-[4rem] max-w-[4rem] min-h-[4rem] max-h-[4rem] rounded-full {!forum?.isAnonymous ? 'cursor-pointer hover:scale-110' : ''}">
            </a>
        {:else}
            <img src="{forum?.authorImageURL}" alt="" class="z-0 min-w-[4rem] max-w-[4rem] min-h-[4rem] max-h-[4rem] rounded-full">
        {/if}
    </div>
    <section class="w-full max-w-full overflow-hidden flex flex-col gap-y-1">
        <div class="flex items-center gap-x-2">
            <div class="flex flex-col gap-y-1 overflow-hidden">
                <div class="font-bold text-lg overflow-hidden text-ellipsis whitespace-nowrap">{forum?.title}</div>
                {#if !forum.isAnonymous}
                    <a href="/profile/{forum.authorUUID}" class="overflow-hidden">
                        <div class="text-md overflow-hidden text-ellipsis whitespace-nowrap hover:underline">{forum?.authorName}</div>
                    </a>
                {:else}
                    <div class="text-md overflow-hidden text-ellipsis whitespace-nowrap">{forum?.authorName}</div>
                {/if}
            </div>
            {#if favorite}
                <div class="ml-auto" bind:this={button}>
                    <Button
                        color={forum.isFavorite ? 'purpleToBlue' : 'pinkToOrange'}
                        gradient
                        class="whitespace-nowrap"
                        type="button"
                        size="sm"
                        on:click={favoriteForumAction}
                    >
                        {forum.isFavorite ? 'ลบออก' : 'เพิ่ม'}
                    </Button>
                </div>
            {/if}
        </div>
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