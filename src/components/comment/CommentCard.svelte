<script lang="ts">
	import ForumFooter from "@components/forum/ForumFooter.svelte";
	import ForumImage from "@components/forum/ForumImage.svelte";
	import EllipsisMenu from "@components/shared/EllipsisMenu.svelte";
	import type { Comment } from "@models/forum";
	import type { Attachment } from "@models/new-post";

    export let label: string;
    export let comment: Comment;
    export let reply = false;

    let attachments: Attachment[] = [];
    if (comment.commentImageURLs) {
        const files: Attachment[] = []
        comment.commentImageURLs.forEach((url) => {
            files.push({
                file: new File([], ""),
                src: url,
                isLoading: true,
            })
        })
        attachments = [...files]
    }
</script>

<div class="rounded-lg shadow-md w-full h-full p-4 sm:p-6 overflow-hidden bg-white text-black dark:bg-gray-700 dark:text-white ease-in duration-200">
    <div class="flex items-center mb-2">
        <div class="font-light text-lg text-gray-400 w-full">{label}</div>
        <EllipsisMenu
            ellipsisMenuID={comment.commentUUID}
            menuSuffixName="ความคิดเห็น"
            type="comment"
            label={`แก้ไข${label}`}
            comment={comment.commentText}
            {attachments}
            editable
            reportable
            removable
            on:edit={(event) => console.log(event.detail.comment, event.detail.attachments.length)}
            on:report={(event) => console.log(`รายงานความคิดเห็น: ${comment.commentUUID}: ${event.detail.reportText}`)}
            on:delete={() => console.log(`ลบความคิดเห็น: ${comment.commentUUID}`)}
        />
    </div>

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
        label={`ตอบกลับ${label}`}
        on:comment={event => console.log("แสดงความคิดเห็น", event.detail.comment, event.detail.attachments.length)}
    />
</div>

<slot />