<script lang="ts">
	import ReportCard from '@components/partials/ReportCard.svelte';
	import { createEventDispatcher } from "svelte";
	import { slide } from "svelte/transition";
	import { Popover } from "flowbite-svelte";
	import ForumEditor from "./ForumEditor.svelte";
	import CommentReply from "@components/comment/CommentReply.svelte";
    import Modal from "@components/modal/Modal.svelte"
	import DeleteModal from "@components/modal/DeleteModal.svelte";
    import type { Attachment, FormSchema } from "@models/new-post";
	import type { Category } from "@models/category";

    export let menuSuffixName: string;
    export let type: string;
    export let editable = false;
    export let removable = false;
    export let reportable = false;
    export let favorite = false;
    export let ellipsisMenuID: string;
    export let isFavorite = false;
    let openEditForumModal = false;
    let openEditCommentModal = false;
    let openDeleteModal = false;
    let openReportModal = false;

    // Edit Forum
    export let title: FormSchema | undefined = undefined;
    export let description: FormSchema | undefined = undefined;
    export let categories: Category[] | undefined = undefined;
    export let attachments: Attachment[];
    let editTitle: FormSchema;
    let editDescription: FormSchema;
    let editCategories: Category[];
    let editAttachments: Attachment[];

    // Edit comment
    export let label: string | undefined = undefined;
    export let comment: string | undefined = undefined;
    let editComment: string;

    const setOpenEditModal = (isOpen: boolean) => {
        if (isForum) {
            openEditForumModal = isOpen;
        } else {
            openEditCommentModal = isOpen;
        }
    }

    let deleteImageUUIDs: string[] = [];

    const initialize = () => {
        element.click(); // hide ellipsis menu while open modal immediately
        if (title) {
            editTitle = {...title}
        }
        if (description) {
            editDescription = {...description}
        }
        if (categories) {
            const cloneCategories: Category[] = [];
            categories.forEach(category => {
                cloneCategories.push({...category})
            })
            editCategories = [...cloneCategories]
        }
        if (comment) {
            editComment = comment
        }
        editAttachments = [...attachments]
    }

    $: isForum = ["forum", "announcement"].includes(type)

    $: (openEditForumModal || openEditCommentModal || openReportModal || openDeleteModal) && initialize()

	const dispatch = createEventDispatcher();
    const editAction = () => {
        let event: any;
        if (isForum) {
            event = {
                title: editTitle?.value.trim(),
                description: editDescription?.value,
                categories: editCategories,
                attachments: editAttachments,
                deleteImageUUIDs,
            }
        } else {
            event = {
                comment: editComment,
                attachments: editAttachments,
                deleteImageUUIDs,
            }
        }
        dispatch('edit', event);
        setOpenEditModal(false);
    };
    const reportAction = (reportText: string) => {
        dispatch('report', { reportText });
        openReportModal = false;
    };
    const deleteAction = () => {
        dispatch('delete');
        openDeleteModal = false;
    };
    const favoriteAction = () => {
        isFavorite = !isFavorite
        element.click();
        dispatch('favorite', { isFavorite })
    }

    let element: HTMLDivElement;
</script>

<div bind:this={element} id="ellipsis-menu-{ellipsisMenuID}" class="float-right w-fit h-fit cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full p-1 transition-[background-color] ease-in duration-200">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
    </svg>
</div>

<Popover class="select-none text-sm w-fit transition-colors ease-in duration-200 py-2 shadow-none" defaultClass="p-0 w-fit" transition={slide} params={{duration: 200}} placement="bottom" trigger="click" triggeredBy="#ellipsis-menu-{ellipsisMenuID}">
    {#if editable}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="flex items-center gap-x-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2" on:click={() => setOpenEditModal(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            <span>แก้ไข{menuSuffixName}</span>
        </div>
    {/if}

    {#if favorite}
        {#if editable}
            <hr class="border-gray-200 dark:border-gray-600">
        {/if}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="flex items-center gap-x-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2" on:click={favoriteAction}>
            {#if isFavorite}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 3l1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 011.743-1.342 48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664L19.5 19.5" />
                </svg>
                <span>ลบจากรายการโปรด</span>
            {:else}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                </svg>
                <span>เพิ่มในรายการโปรด</span>
            {/if}
        </div>
    {/if}

    {#if reportable}
        {#if editable || favorite}
            <hr class="border-gray-200 dark:border-gray-600">
        {/if}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="flex items-center gap-x-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2" on:click={() => openReportModal = true}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <span>รายงาน{menuSuffixName}</span>
        </div>
    {/if}

    {#if removable}
        {#if editable || favorite || reportable}
            <hr class="border-gray-200 dark:border-gray-600">
        {/if}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="flex items-center gap-x-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2" on:click={() => openDeleteModal = true}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
            <span>ลบ{menuSuffixName}</span>
        </div>
    {/if}
</Popover>

{#if title && description}
    <Modal bind:open={openEditForumModal} defaultClass="w-full max-w-5xl m-auto" title="แก้ไข{menuSuffixName}">
        <ForumEditor
            bind:title={editTitle}
            bind:description={editDescription}
            bind:attachments={editAttachments}
            bind:categories={editCategories}
            bind:deleteImageUUIDs
            cancel={() => openEditForumModal = false}
            submit={editAction}
        />
    </Modal>
{/if}

{#if label && comment}
    <Modal bind:open={openEditCommentModal}>
        <CommentReply
            bind:label
            bind:comment={editComment}
            bind:attachments={editAttachments}
            bind:deleteImageUUIDs
            cancel={() => openEditCommentModal = false}
            submit={editAction}
        />
    </Modal>
{/if}

{#if reportable}
    <Modal bind:open={openReportModal} defaultClass="w-fit max-w-md">
        <ReportCard
            suffixName={menuSuffixName}
            bind:open={openReportModal}
            on:report={event => reportAction(event.detail)}
        />
    </Modal>
{/if}

{#if removable}
    <DeleteModal
        bind:open={openDeleteModal}
        deleteButtonName="ลบ{menuSuffixName}"
        on:delete={deleteAction}
    >
        คุณแน่ใจหรือไม่ที่จะ<span class="text-red-500">ลบ{menuSuffixName}</span>นี้?
    </DeleteModal>
{/if}