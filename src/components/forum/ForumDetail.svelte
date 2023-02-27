<script lang="ts">
	import ForumImage from "./ForumImage.svelte";
	import ForumFooter from "./ForumFooter.svelte";
	import CategoryBadge from "@components/badge/CategoryBadge.svelte";
    import EllipsisMenu from "@components/shared/EllipsisMenu.svelte";
	import type { Announcement } from "@models/announcement";
    import type { ForumDetail } from "@models/forum";

    export let forumDetail: ForumDetail | Announcement;

    function instanceOfForumDetail(object: any): object is ForumDetail {
        return 'categories' in object;
    }

    const imageURLs = ((): string[] => {
        const urls = instanceOfForumDetail(forumDetail) ? forumDetail.forumImageURLs : forumDetail.announcementImageURLs
        if (urls) {
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

    {#if imageURLs?.length}
        <ForumImage {imageURLs} />
    {/if}

    <ForumFooter
        username={forumDetail.authorName}
        userImageURL={forumDetail.authorImageURL}
        likeCount={instanceOfForumDetail(forumDetail) ? forumDetail.likeCount : undefined}
        commentCount={instanceOfForumDetail(forumDetail) ? forumDetail.commentCount : undefined}
    />
</div>