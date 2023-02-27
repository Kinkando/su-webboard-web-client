<script lang="ts">
	import ForumFooter from "@components/forum/ForumFooter.svelte";
	import ForumImage from "@components/forum/ForumImage.svelte";
	import type { Comment } from "@models/forum";

    export let label: string;
    export let comment: Comment;
    export let reply = false;
</script>

<div class="rounded-lg shadow-md w-full h-full p-4 sm:p-6 overflow-hidden bg-white text-black dark:bg-gray-700 dark:text-white ease-in duration-200">
    <div class="font-light text-lg text-gray-400 mb-2">{label}</div>
    <div class="text-lg min-h-[6rem]">
        <span>{comment.commentText}</span>
        {#if comment.commentImageURLs?.length}
            <ForumImage imageURLs={comment.commentImageURLs} />
        {/if}
    </div>

    <ForumFooter
        username={comment.commenterName}
        userImageURL={comment.commenterImageURL}
        likeCount={comment.likeCount}
        commentCount={reply ? comment.commentCount : undefined}
    />
</div>

<slot />