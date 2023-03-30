<script lang="ts">
	import { createEventDispatcher } from 'svelte';
    import CommentBadge from "@components/badge/CommentBadge.svelte";
	import LikeBadge from "@components/badge/LikeBadge.svelte";
	import CommentReply from "@components/comment/CommentReply.svelte";
	import Modal from "@components/modal/Modal.svelte";
	import type { Attachment } from '@models/new-post';
	import { Button, Chevron, Dropdown, Helper, Radio } from 'flowbite-svelte';
	import { slide } from 'svelte/transition';
	import { Order } from '@commons/order';

    export let type: 'forum' | 'comment'
    export let uuid: string;
    export let isLike: boolean | undefined;
    export let likeCount: number | undefined = undefined;
    export let commentCount: number | undefined = undefined;
    export let isAnonymous: boolean | undefined;
    export let isSortingComment: boolean = false;
    export let userUUID: string;
    export let userDisplayName: string;
    export let userImageURL: string;
    export let label: string;
    export let replyText = "ตอบกลับ";
    export let replyTrigger = false;
    export let createdAt: string;
    export let orderBy: Order = Order.ASC;

    let open = false;
    let comment = "";
    let attachments: Attachment[] = [];
    let openReplyModal = false;
	const dispatch = createEventDispatcher<{[eventName: string]: {comment: string, attachments: Attachment[]} | { orderBy: Order.DESC | Order.ASC }}>();
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

    $: if (orderBy) {
        open = false
    }
</script>

<div class="flex items-center justify-between mt-3 -mb-3">
    {#if likeCount !== undefined}
        <div class="flex items-center font-bold">
            <LikeBadge bind:likeCount bind:uuid bind:isLike toggle bind:type />
        </div>
    {/if}
    {#if commentCount !== undefined}
        <div class="flex items-center font-bold">
            <CommentBadge bind:commentCount click on:click={() => openReplyModal = true} />
        </div>
    {/if}
</div>

<hr class="mt-6 mb-3 dark:border-gray-500">
<div class="flex justify-between items-center">
    <div class="flex items-center overflow-hidden">
        {#if !isAnonymous}
            <a href="/profile/{userUUID}">
                <img src={userImageURL} alt="" class="ease-in duration-200 min-w-[4rem] max-w-[4rem] min-h-[4rem] max-h-[4rem] rounded-full cursor-pointer hover:brightness-75">
            </a>
        {:else}
            <img src={userImageURL} alt="" class="ease-in duration-200 min-w-[4rem] max-w-[4rem] min-h-[4rem] max-h-[4rem] rounded-full">
        {/if}
        <div class="ml-3 space-y-1 overflow-hidden mr-4">
            {#if !isAnonymous}
                <a href="/profile/{userUUID}" class="overflow-hidden w-fit max-w-full">
                    <div class="font-bold overflow-hidden text-ellipsis whitespace-nowrap hover:underline">{userDisplayName}</div>
                </a>
            {:else}
                <div class="font-bold overflow-hidden text-ellipsis whitespace-nowrap">{userDisplayName}</div>
            {/if}
            <div class="font-light text-sm overflow-hidden text-ellipsis whitespace-nowrap">{createdAt}</div>
        </div>
    </div>
    {#if commentCount !== undefined}
        <div class="flex flex-col space-y-2 items-end">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="select-none underline text-[var(--primary-color)] dark:text-[var(--primary-color-75)] cursor-pointer break-words" on:click={() => openReplyModal = true}>{replyText}</div>
            {#if isSortingComment}
                <Button size="lg" color="alternative" class="md:w-fit w-full whitespace-nowrap focus:!border-transparent focus:!ring-0 !bg-transparent !outline-transparent !border-transparent !p-0 !text-[var(--primary-color)] dark:!text-[var(--primary-color-75)]">
                    <Chevron><div class="whitespace-nowrap">{ orderBy === Order.ASC ? 'เรียงตามลำดับ' : 'ใหม่ล่าสุด' }</div></Chevron>
                </Button>
                <Dropdown class="py-2 rounded-md bg-gray-50 dark:bg-gray-900" transition={slide} bind:open>
                    <li class="p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                        <Radio name="group3" bind:group={orderBy} value={Order.ASC} class="flex flex-start cursor-pointer">
                            <div class="flex flex-col">
                                <div>เรียงตามลำดับ</div>
                                <Helper>แสดงความคิดเห็นตามลำดับที่สร้างก่อนขึ้นก่อน</Helper>
                            </div>
                        </Radio>
                    </li>
                    <li class="p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                        <Radio name="group3" bind:group={orderBy} value={Order.DESC} class="flex flex-start cursor-pointer">
                            <div class="flex flex-col">
                                <div>ใหม่ล่าสุด</div>
                                <Helper>แสดงความคิดเห็นใหม่ล่าสุดขึ้นก่อน</Helper>
                            </div>
                        </Radio>
                    </li>
                </Dropdown>
            {/if}
        </div>
    {/if}
</div>

<Modal bind:open={openReplyModal}>
    <CommentReply
        bind:label
        bind:comment
        bind:attachments
        cancel={() => openReplyModal = false}
        submit={commentPost}
    />
</Modal>