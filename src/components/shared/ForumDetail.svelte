<script lang="ts">
	import CategoryBadge from "@components/badge/CategoryBadge.svelte";
	import CommentBadge from "@components/badge/CommentBadge.svelte";
	import LikeBadge from "@components/badge/LikeBadge.svelte";
    import EllipsisMenu from "@components/shared/EllipsisMenu.svelte";
	import type { Announcement } from "@models/announcement";
    import type { ForumDetail } from "@models/forum";
	import { Spinner } from "flowbite-svelte";

    export let forumDetail: ForumDetail | Announcement;

    function instanceOfForumDetail(object: any): object is ForumDetail {
        return 'categories' in object;
    }

    let imagesIsLoading: boolean[] = [];
    const imageURLs = ((): string[] => {
        const urls = instanceOfForumDetail(forumDetail) ? forumDetail.forumImageURLs : forumDetail.announcementImageURLs
        if (urls) {
            for(let i=0; i<urls.length; i++) {
                imagesIsLoading.push(true)
            }
            return urls
        }
        return []
    })()
</script>

<div class="rounded-lg shadow-md w-full h-full p-4 sm:p-6 overflow-hidden bg-white text-black dark:bg-gray-700 dark:text-white ease-in duration-200">
    <div class="flex">
        <div class="w-full text-xl font-bold">
            {forumDetail.title}
        </div>
        <EllipsisMenu ellipsisMenuID={forumDetail?.forumUUID} />
    </div>
    {#if instanceOfForumDetail(forumDetail) && forumDetail.categories?.length}
        <div class="flex flex-wrap items-center gap-1 mt-1">
            {#each forumDetail.categories as category}
                <CategoryBadge {...category} />
            {/each}
        </div>
    {/if}

    <hr class="my-3 dark:border-gray-500">
    <div class="font-medium">
        {forumDetail.description}
    </div>

    {#if imageURLs}
        <div class="mt-6 gap-2 no-select flex flex-wrap items-center justify-center w-full h-fit">
            {#each imageURLs as image, index}
                <div class="relative overflow-hidden rounded-md aspect-square">
                    {#if imagesIsLoading[index]}
                        <figure class="w-72 h-72 animate-pulse ease-in duration-200 absolute z-0 bg-gray-400 flex items-center justify-center">
                            <Spinner size="10" />
                        </figure>
                    {/if}
                    <img
                        alt=""
                        src="{image}"
                        class="w-72 h-72 hover:scale-105 ease-in duration-200 hover:brightness-75"
                        on:load={() => imagesIsLoading[index] = false}
                    >
                </div>
            {/each}
        </div>
    {/if}

    {#if instanceOfForumDetail(forumDetail)}
        <div class="flex items-center justify-between mt-3 -mb-3">
            <div class="flex items-center font-bold">
                <LikeBadge likeCount={forumDetail.likeCount} toggle type="forum" />
            </div>
            <div class="flex items-center font-bold">
                <CommentBadge commentCount={forumDetail.commentCount} click on:click={() => console.log("REPLY FORUM")} />
            </div>
        </div>
    {/if}

    <hr class="mt-6 mb-3 dark:border-gray-500">
    <div class="flex justify-between items-center">
        <div class="flex items-center">
            <img src={forumDetail.authorImageURL} alt="" class="w-16 h-16">
            <div class="ml-3 space-y-1">
                <div class="font-bold">{forumDetail.authorName}</div>
                <div class="font-light text-sm">2 ชั่วโมง</div>
            </div>
        </div>
        {#if instanceOfForumDetail(forumDetail)}
            <div class="underline text-[var(--primary-color)] dark:text-[var(--primary-color-75)] cursor-pointer">ตอบกลับ</div>
        {/if}
    </div>
</div>