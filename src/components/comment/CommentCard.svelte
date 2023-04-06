<script lang="ts">
	import HTTP from "@commons/http";
	import ForumFooter from "@components/forum/ForumFooter.svelte";
	import ForumImage from "@components/forum/ForumImage.svelte";
	import EllipsisMenu from "@components/shared/EllipsisMenu.svelte";
	import LoadingSpinner from "@components/spinner/LoadingSpinner.svelte";
	import type { Comment } from "@models/comment";
	import type { Attachment } from "@models/new-post";
    import type { Document } from "@models/forum";
	import { deleteComment, getComment, reportComment, upsertComment } from "@services/comment";
    import { alert } from "@stores/alert";
	import { getUserUUID } from "@util/localstorage";
	import { createEventDispatcher, onDestroy } from "svelte";
	import { timeRange } from "@util/datetime";
	import { page } from "$app/stores";

    export let label: string;
    export let comment: Comment;
    export let forumUUID: string;
    export let authorUUID: string;
    export let replyCommentUUID: string = "";
    export let isView = false;

    let isLoading = false;
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
        if (comment.commentText === commentEdit && attachmentsEdit.length === attachments.length && deleteImageUUIDs.length === 0) {
            return;
        }

        isLoading = true;

        comment.commentText = commentEdit;
        const files = attachmentsEdit.map(attachment => attachment.file)
        const res = await upsertComment(forumUUID, comment, files, deleteImageUUIDs, replyCommentUUID || undefined)
        if (res.status !== HTTP.StatusOK) {

            alert({
                type: 'error',
                message: 'ขออภัย, ระบบเกิดความขัดข้อง กรุณาลองใหม่อีกครั้ง!',
            })
        } else {
            // update data on local
            comment.updatedAt = new Date();
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
        isLoading = false;
    }

    const reportCommentAction = async(reason: string) => {
        isLoading = true
        await reportComment(comment.commentUUID, reason)
        isLoading = false
        alert({
            type: 'success',
            message: 'รายงานความคิดเห็นสำเร็จ, กรุณารอให้ผู้ดูแลตรวจสอบและอนุมัติคำขอ',
        })
    }

    const deleteCommentAction = async() => {
        isLoading = true;

        await deleteComment(comment.commentUUID)
        dispatch('delete')

        isLoading = false;
    }

    const createCommentAction = async(commentCreate: string, attachments: Attachment[]) => {
        isLoading = true;

        const files = attachments.map(attachment => attachment.file)
        const createCommentReq = await upsertComment(forumUUID, { commentText: commentCreate } as any, files, undefined, comment.commentUUID)
        if (createCommentReq?.data) {
            const res = await getComment(forumUUID, createCommentReq.data.commentUUID)
            if (res) {
                res.isLike = false;
                res.likeCount = 0;
                dispatch('create', { comment: res })
            } else {
                alert({
                    type: 'error',
                    message: 'ขออภัย, ระบบเกิดความขัดข้อง กรุณาลองใหม่อีกครั้ง!',
                })
            }
        } else {
            alert({
                type: 'error',
                message: 'ขออภัย, ระบบเกิดความขัดข้อง กรุณาลองใหม่อีกครั้ง!',
            })
        }

        isLoading = false;
    }

    $: userUUID = getUserUUID()

    $: if(comment.updatedAt !== undefined) {
        updatedAt = timeRange(comment.updatedAt)
    }

    let createdAt = timeRange(comment.createdAt)
    let updatedAt = comment.updatedAt ? timeRange(comment.updatedAt) : ''
    const period = setInterval(() => {
        createdAt = timeRange(comment.createdAt)
        if (comment.updatedAt) {
            updatedAt = timeRange(comment.updatedAt)
        }
    }, 1000)
    onDestroy(() => clearInterval(period))

    export let scrollView: boolean;
    $: commentUUID = $page.url.searchParams.get('commentUUID')
    $: commentUUID === comment.commentUUID && scrollView && scrollIntoView()
    function scrollIntoView() {
        const el = document.querySelector(`#comment-${commentUUID}`);
        if (!el) return;
        // el.scrollIntoView({ behavior: 'smooth' });
        let dims = el.getBoundingClientRect();
        window.scrollTo({left: window.scrollX, top: dims.top - 70, behavior: 'smooth'});
        scrollView = false;
    }
</script>

<LoadingSpinner bind:isLoading />

<div id="comment-{comment.commentUUID}" class="{commentUUID === comment.commentUUID ? 'border-blue-400 border' : ''} rounded-lg shadow-md w-full h-full p-4 sm:p-6 overflow-hidden bg-white text-black dark:bg-gray-700 dark:text-white ease-in duration-200">
    <div class="flex items-center mb-2">
        <div class="font-light text-lg text-gray-400 w-full">{label}</div>
        {#if !isView}
            <EllipsisMenu
                ellipsisMenuID={comment.commentUUID}
                menuSuffixName="ความคิดเห็น"
                type="comment"
                label={`แก้ไข${label}`}
                comment={comment.commentText}
                {attachments}
                editable={comment.commenterUUID === userUUID}
                reportable={comment.commenterUUID !== userUUID}
                removable={comment.commenterUUID === userUUID || authorUUID === userUUID}
                on:edit={(event) => editCommentAction(event.detail.comment, event.detail.attachments, event.detail.deleteImageUUIDs)}
                on:report={(event) => reportCommentAction(event.detail.reportText)}
                on:delete={() => deleteCommentAction()}
            />
        {/if}
    </div>

    <div class="text-lg min-h-[6rem]">
        <span>{@html comment.commentText.replaceAll('\n', '<br>')}</span>
        {#if comment.commentImages?.length}
            <ForumImage imageURLs={comment.commentImages?.map(doc => doc.url)} />
        {/if}
    </div>

    {#if comment.updatedAt}
        <div class="mt-4 text-gray-500">แก้ไขล่าสุด: {updatedAt || timeRange(comment.updatedAt)}</div>
    {/if}

    <ForumFooter
        type="comment"
        bind:uuid={comment.commentUUID}
        bind:isLike={comment.isLike}
        bind:isAnonymous={comment.isAnonymous}
        bind:userUUID={comment.commenterUUID}
        bind:userDisplayName={comment.commenterName}
        bind:userImageURL={comment.commenterImageURL}
        bind:likeCount={comment.likeCount}
        commentCount={!replyCommentUUID ? (comment.replyComments?.length || 0) : undefined}
        label={`ตอบกลับ${label}`}
        bind:createdAt
        on:comment={event => createCommentAction(event.detail.comment, event.detail.attachments)}
        bind:isView
    />
</div>

<slot />