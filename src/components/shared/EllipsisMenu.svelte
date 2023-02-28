<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { scale, slide } from "svelte/transition";
	import { Button, Modal, Popover, Textarea } from "flowbite-svelte";
	import NewPost from "./NewPost.svelte";
	import CommentReply from "@components/comment/CommentReply.svelte";
    import type { Attachment, FormSchema } from "@models/new-post";
	import type { Category } from "@models/category";

    export let menuSuffixName: string;
    export let type: string;
    export let editable = false;
    export let removable = false;
    export let reportable = false;
    export let ellipsisMenuID: string;
    let openEditForumModal = false;
    let openEditCommentModal = false;
    let openDeleteModal = false;
    let openReportModal = false;

    let reportText = "";

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

    const initialize = () => {
        if (title) {
            editTitle = {...title}
        }
        if (description) {
            editDescription = {...description}
        }
        if (categories) {
            editCategories = [...categories]
        }
        if (comment) {
            editComment = comment
        }
        editAttachments = [...attachments]
        reportText = "";
    }

    $: isForum = ["forum", "announcement"].includes(type)

    $: (openEditForumModal || openEditCommentModal || openReportModal) && initialize()

	const dispatch = createEventDispatcher();
    const editAction = () => {
        let event: any;
        if (isForum) {
            event = {
                title: editTitle?.value,
                description: editDescription?.value,
                categories: editCategories,
                attachments: editAttachments,
            }
        } else {
            event = {
                comment: editComment,
                attachments: editAttachments,
            }
        }
        dispatch('edit', event);
        setOpenEditModal(false);
    };
    const reportAction = () => {
        dispatch('report', { reportText });
        openReportModal = false;
    };
    const deleteAction = () => {
        dispatch('delete');
        openDeleteModal = false;
    };
</script>

<div id="ellipsis-menu-{ellipsisMenuID}" class="float-right w-fit h-fit cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full p-1 transition-[background-color] ease-in duration-200">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
    </svg>
</div>

<Popover class="no-select w-64 text-sm w-fit transition-colors ease-in duration-200 py-2 shadow-none" defaultClass="p-0 w-fit" transition={slide} params={{duration: 200}} placement="bottom" trigger="click" triggeredBy="#ellipsis-menu-{ellipsisMenuID}">
    {#if editable}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="flex items-center gap-x-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2" on:click={() => setOpenEditModal(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            <span>แก้ไข{menuSuffixName}</span>
        </div>
        <hr class="border-gray-200 dark:border-gray-600">
    {/if}

    {#if reportable}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="flex items-center gap-x-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2" on:click={() => openReportModal = true}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <span>รายงาน{menuSuffixName}</span>
        </div>
        <hr class="border-gray-200 dark:border-gray-600">
    {/if}

    {#if removable}
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
    <Modal title="แก้ไข{menuSuffixName}" transition={scale} bind:open={openEditForumModal} class="w-full">
        <NewPost
            bind:title={editTitle}
            bind:description={editDescription}
            bind:attachments={editAttachments}
            bind:categories={editCategories}
            cancel={() => openEditForumModal = false}
            submit={editAction}
        />
    </Modal>
{/if}

{#if label && comment}
    <Modal transition={scale} bind:open={openEditCommentModal} class="w-full">
        <CommentReply
            bind:label
            bind:comment={editComment}
            bind:attachments={editAttachments}
            cancel={() => openEditCommentModal = false}
            submit={editAction}
        />
    </Modal>
{/if}

<Modal transition={scale} bind:open={openReportModal} size="xs" autoclose>
    <div class="text-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
        <h3 class="text-lg font-bold text-gray-500 dark:text-gray-400">คุณต้องการรายงาน{menuSuffixName}นี้หรือไม่?</h3>
        <div class="mt-1 mb-5">คุณสามารถส่งรายงานสิ่งที่ดูไม่เหมาะสมได้ตลอดเวลา และเราจะไม่แจ้งให้ผู้ใดทราบว่าใครเป็นผู้รายงาน</div>
        <Textarea placeholder="กรุณาใส่รายละเอียด ..." bind:value={reportText} class="min-h-[6rem] placeholder-gray-300
        !bg-gray-50 dark:!bg-gray-700" />
        <Button color="red" class="mr-2" on:click={reportAction}>ส่งรายงาน</Button>
        <Button color="alternative">ยกเลิก</Button>
    </div>
</Modal>

<Modal transition={scale} bind:open={openDeleteModal} size="xs" autoclose>
    <div class="text-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">คุณแน่ใจหรือไม่ที่จะลบ{menuSuffixName}นี้?</h3>
        <Button color="red" class="mr-2" on:click={deleteAction}>ลบ{menuSuffixName}</Button>
        <Button color="alternative">ยกเลิก</Button>
    </div>
</Modal>