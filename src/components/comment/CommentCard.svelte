<script lang="ts">
	import ForumFooter from "@components/forum/ForumFooter.svelte";
	import ForumImage from "@components/forum/ForumImage.svelte";
	import EllipsisMenu from "@components/shared/EllipsisMenu.svelte";
	import type { Comment } from "@models/comment";
	import type { Attachment } from "@models/new-post";
    import type { Document } from "@models/forum";
	import { deleteComment, upsertComment } from "@services/comment";
	import { getUserUUID } from "@util/localstorage";
	import { createEventDispatcher } from "svelte";

    export let label: string;
    export let comment: Comment;
    export let forumUUID: string;
    export let replyCommentUUID: string = "";

    let attachments: Attachment[] = [];
    $: comment.commentImages !== undefined && initImages();
    const initImages = () => {
        if (comment.commentImages) {
            const files: Attachment[] = [];
            comment.commentImages.forEach(async (image) => {
                files.push({
                    uuid: image?.uuid || undefined,
                    file: new File([], ""),
                    src: image.url,
                    isLoading: true,
                })
            })
            attachments = [...files]
        }
    }

    const dispatch = createEventDispatcher()

    const editCommentAction = async(commentEdit: string, attachmentsEdit: Attachment[], deleteImageUUIDs: string[]) => {
        comment.commentText = commentEdit;
        const files = attachmentsEdit.map(attachment => attachment.file)
        const res = await upsertComment(forumUUID, comment, files, deleteImageUUIDs, replyCommentUUID || undefined)

        // update data on local
        let tempCommentImages: Document[] = []
        if (deleteImageUUIDs && comment.commentImages) {
            tempCommentImages = comment.commentImages.filter(image => !deleteImageUUIDs.includes(image.uuid)) || []
        }
        if (res.data?.documents) {
            if (tempCommentImages) {
                comment.commentImages = [...tempCommentImages, ...res.data.documents]
            } else {
                comment.commentImages = [...res.data.documents]
            }
        }
    }

    const reportCommentAction = async(reason: string) => {
        console.log(`รายงานความคิดเห็น: ${comment.commentUUID}: ${reason}`)
    }

    const deleteCommentAction = async() => {
        await deleteComment(comment.commentUUID)
        dispatch('delete', { comment })
    }

    const createCommentAction = async(commentCreate: string, attachments: Attachment[]) => {
        const files = attachments.map(attachment => attachment.file)
        const res = await upsertComment(forumUUID, { commentText: commentCreate } as any, files, undefined, comment.commentUUID)
        if (res?.data) {
            dispatch('create', {
                comment: {
                    commentUUID: res?.data.commentUUID,
                    commentText: commentCreate,
                }
            })
        }
    }

    $: userUUID = getUserUUID()
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
            editable={comment.commenterUUID === userUUID}
            reportable={comment.commenterUUID !== userUUID}
            removable={comment.commenterUUID === userUUID}
            on:edit={(event) => editCommentAction(event.detail.comment, event.detail.attachments, event.detail.deleteImageUUIDs)}
            on:report={(event) => reportCommentAction(event.detail.reportText)}
            on:delete={() => deleteCommentAction()}
        />
    </div>

    <div class="text-lg min-h-[6rem]">
        <span>{@html comment.commentText.replaceAll('\n', '<br>')}</span>
        {#if comment.commentImages?.length}
            <ForumImage imageURLs={comment.commentImages?.map(doc => doc.url)} />
        {/if}
    </div>

    <ForumFooter
        type="comment"
        uuid={comment.commentUUID}
        isLike={comment.isLike}
        username={comment.commenterName}
        userImageURL={comment.commenterImageURL}
        likeCount={comment.likeCount}
        commentCount={!replyCommentUUID ? (comment.replyComments?.length || 0) : undefined}
        label={`ตอบกลับ${label}`}
        createdAt={comment.createdAt}
        on:comment={event => createCommentAction(event.detail.comment, event.detail.attachments)}
    />
</div>

<slot />