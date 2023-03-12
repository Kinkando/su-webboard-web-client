<script lang="ts">
	import type { Attachment } from '@models/new-post';
	import CommentBadge from "@components/badge/CommentBadge.svelte";
	import LikeBadge from "@components/badge/LikeBadge.svelte";
	import CommentReply from "@components/comment/CommentReply.svelte";
	import Modal from "@components/modal/Modal.svelte";
	import { createEventDispatcher } from 'svelte';

    export let likeCount: number | undefined = undefined;
    export let commentCount: number | undefined = undefined;
    export let username: string;
    export let userImageURL: string;
    export let label: string;
    export let replyText = "ตอบกลับ";
    export let replyTrigger = false;

    let comment = "";
    let attachments: Attachment[] = [];
    let openReplyModal = false;
	const dispatch = createEventDispatcher<{[eventName: string]: {comment: string, attachments: Attachment[]}}>();
    const commentPost = () => {
        dispatch("comment", { comment, attachments })
        openReplyModal = false
    }
    $: if(openReplyModal) {
        comment = "";
        attachments = []
    }

    $: replyTrigger === true && replyAction()
    const replyAction = () => {
        openReplyModal = true;
        comment = "";
        attachments = []
        replyTrigger = false;
    }

</script>

<div class="flex items-center justify-between mt-3 -mb-3">
    {#if likeCount}
        <div class="flex items-center font-bold">
            <LikeBadge {likeCount} toggle type="forum" />
        </div>
    {/if}
    {#if commentCount}
        <div class="flex items-center font-bold">
            <CommentBadge {commentCount} click on:click={() => openReplyModal = true} />
        </div>
    {/if}
</div>

<hr class="mt-6 mb-3 dark:border-gray-500">
<div class="flex justify-between items-center">
    <div class="flex items-center overflow-hidden">
        <img src={userImageURL} alt="" class="w-16 h-16">
        <div class="ml-3 space-y-1 overflow-hidden mr-4">
            <div class="font-bold overflow-hidden text-ellipsis whitespace-nowrap">{username}</div>
            <div class="font-light text-sm overflow-hidden text-ellipsis whitespace-nowrap">2 ชั่วโมง</div>
        </div>
    </div>
    {#if commentCount}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="no-select underline text-[var(--primary-color)] dark:text-[var(--primary-color-75)] cursor-pointer break-words" on:click={() => openReplyModal = true}>{replyText}</div>
    {/if}
</div>

<Modal bind:open={openReplyModal}>
    <CommentReply
        bind:label
        bind:comment
        bind:attachments
        cancel={() => openReplyModal = false}
        submit={commentPost}
        on:comment={event => console.log("แสดงความคิดเห็น", event.detail.comment, event.detail.attachments.length)}
    />
</Modal>