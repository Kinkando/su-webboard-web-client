<script lang="ts">
	import { onDestroy } from 'svelte';
	import ForumImage from "./ForumImage.svelte";
	import ForumFooter from "./ForumFooter.svelte";
	import HTTP from "@commons/http";
	import { Order } from "@commons/order";
	import CategoryBadge from "@components/badge/CategoryBadge.svelte";
	import CommentList from "@components/comment/CommentList.svelte";
    import EllipsisMenu from "@components/shared/EllipsisMenu.svelte";
	import LoadingSpinner from "@components/spinner/LoadingSpinner.svelte";
	import type { Category } from "@models/category";
	import type { Comment } from '@models/comment';
    import type { ForumDetail, ForumRequest } from "@models/forum";
	import type { Attachment, FormSchema } from "@models/new-post";
	import { upsertComment } from "@services/comment";
	import { deleteForum, favoriteForum, upsertForum } from "@services/forum";
    import { alert } from "@stores/alert";
	import { defined } from "@util/generic";
	import { getUserUUID } from "@util/localstorage";
	import { timeRange } from "@util/datetime";
	import { goto } from '$app/navigation';

    export let forumDetail: ForumDetail;
    export let categories: Category[];
    export let replyForum = false;
    export let total = 0;

    let isLoading = false;
    let orderBy: Order = Order.ASC;
    let newComment: (comment: Comment) => Promise<void>;

    // Edit modal
    let title: FormSchema = {value: forumDetail.title, label: `หัวข้อกระทู้`, placeholder: `กรุณาใส่หัวข้อกระทู้...`}
    let description: FormSchema = {value: forumDetail.description!, label: "รายละเอียด", placeholder: "กรุณาใส่รายละเอียด..."}
    let attachments: Attachment[] = [];
    let label = "แสดงความคิดเห็น"

    $: isShowSortingComment = total > 0

    function initImages() {
        const images = forumDetail.forumImages
        if (images) {
            const files: Attachment[] = [];
            images.forEach(async (image) => {
                files.push({
                    uuid: image?.uuid || undefined,
                    file: new File([], ""),
                    src: image.url,
                    isLoading: true,
                })
            })
            attachments = [...files]
            return images.map(image => image.url)
        }
        return []
    }

    $: imageURLs = ((): string[] => {
        if (forumDetail.forumImages) {
            return initImages()
        }
        return []
    })()

    const editForumAction = async(titleEdit: string, descriptionEdit: string, categoriesEdit: Category[], attachmentsEdit: Attachment[], deleteImageUUIDs: string[]) => {
        const categoryIDs = categories.filter(category => category.isActive).map(category => category.categoryID!)
        const categoryIDsEdit = categoriesEdit.filter(category => category.isActive).map(category => category.categoryID!)
        if (forumDetail.title !== titleEdit || forumDetail.description !== descriptionEdit || attachments.length !== attachmentsEdit.length || deleteImageUUIDs.length !== 0 || categoryIDs.length !== categoryIDsEdit.length || categoryIDs.filter(categoryID => !categoryIDsEdit.includes(categoryID)).length > 0) {
            const files = attachmentsEdit.map(attachment => attachment.file)
            const forum: ForumRequest = {
                forumUUID: forumDetail.forumUUID,
                title: titleEdit,
                description: descriptionEdit,
                categoryIDs: categoryIDsEdit,
                forumImageUUIDs: deleteImageUUIDs,
            }
            isLoading = true;
            const res = await upsertForum(forum, files)

            if (res.status !== HTTP.StatusOK) {
                alert({
                    type: 'error',
                    message: 'ขออภัย, ระบบเกิดความขัดข้อง กรุณาลองใหม่อีกครั้ง!',
                })
            } else {
                // loading edit data
                forumDetail.updatedAt = new Date();
                forumDetail.title = titleEdit;
                forumDetail.description = descriptionEdit;
                title.value = titleEdit;
                description.value = descriptionEdit;
                if (categories) {
                    categories.forEach((category, index) => category.isActive = categoriesEdit[index].isActive)
                }
                if (deleteImageUUIDs && forumDetail.forumImages) {
                    forumDetail.forumImages = forumDetail.forumImages.filter(image => !deleteImageUUIDs.includes(image.uuid))
                }
                if (res.data?.documents) {
                    if (forumDetail.forumImages) {
                        forumDetail.forumImages = [...forumDetail.forumImages, ...res.data.documents]
                    } else {
                        forumDetail.forumImages = [...res.data.documents]
                    }
                }
                forumDetail.categories = categories?.filter(category => category.isActive)!
                imageURLs = initImages()
            }
            isLoading = false
        }
    }

    const deleteForumAction = async() => {
        isLoading = true;
        await deleteForum(forumDetail?.forumUUID)
        isLoading = false;
        await goto('/')
    }

    const reportForumAction = async(reason: string) => {
        console.log(`รายงานกระทู้: ${forumDetail.forumUUID}: ${reason}`)
    }

    const favoriteForumAction = async(isFavorite: boolean) => await favoriteForum(forumDetail.forumUUID, isFavorite)

    const commentForumAction = async(commentText: string, attachments: Attachment[]) => {
        const files = attachments.map(attachment => attachment.file)
        const comment: any = {
            commentText,
            forumUUID: forumDetail.forumUUID,
        }
        isLoading = true;
        const res = await upsertComment(forumDetail.forumUUID, comment, files)
        if (res.status !== HTTP.StatusOK) {
            alert({
                type: 'error',
                message: 'ขออภัย, ระบบเกิดความขัดข้อง กรุณาลองใหม่อีกครั้ง!',
            })
        } else if (res?.data) {
            comment.commentUUID = res.data.commentUUID
            comment.commentImages = res.data.documents
            await newComment(comment)
        }
        isLoading = false;
    }

    $: userUUID = getUserUUID()

    $: if(forumDetail.updatedAt !== undefined) {
        updatedAt = timeRange(forumDetail.updatedAt)
    }

    let createdAt = timeRange(forumDetail.createdAt)
    let updatedAt = forumDetail.updatedAt ? timeRange(forumDetail.updatedAt) : ''
    const period = setInterval(() => {
        createdAt = timeRange(forumDetail.createdAt)
        if (forumDetail.updatedAt) {
            updatedAt = timeRange(forumDetail.updatedAt)
        }
    }, 1000)
    onDestroy(() => clearInterval(period))
</script>

<LoadingSpinner bind:isLoading />

<div class="rounded-lg shadow-md w-full h-full p-4 sm:p-6 overflow-hidden bg-white text-black dark:bg-gray-700 dark:text-white ease-in duration-200">
    <div class="flex">
        <div class="w-full text-xl font-bold">
            {forumDetail.title}
        </div>
        <EllipsisMenu
            ellipsisMenuID={forumDetail?.forumUUID}
            type={'forum'}
            menuSuffixName={"กระทู้"}
            editable={forumDetail.authorUUID === userUUID}
            reportable={forumDetail.authorUUID !== userUUID}
            removable={forumDetail.authorUUID === userUUID}
            favorite
            isFavorite={forumDetail.isFavorite}
            {title}
            {description}
            {categories}
            {attachments}
            on:edit={(event) => editForumAction(event.detail.title, event.detail.description, event.detail.categories, event.detail.attachments, event.detail.deleteImageUUIDs)}
            on:report={(event) => reportForumAction(event.detail.reportText)}
            on:delete={() => deleteForumAction()}
            on:favorite={event => favoriteForumAction(event.detail.isFavorite)}
        />
    </div>
    {#if forumDetail.categories?.length}
        <div class="flex flex-wrap items-center gap-1 mt-1">
            {#each forumDetail.categories as category}
                <CategoryBadge categoryID={defined(category.categoryID)} categoryName={category.categoryName} categoryHexColor={category.categoryHexColor} />
            {/each}
        </div>
    {/if}

    <hr class="my-3 dark:border-gray-500">
    <div class="font-medium min-h-[12rem]">
        {@html forumDetail.description.replaceAll('\n', '<br>')}
        {#if imageURLs.length}
            <ForumImage bind:imageURLs />
        {/if}
    </div>

    {#if forumDetail.updatedAt}
        <div class="mt-4 text-gray-500">แก้ไขล่าสุด: {updatedAt}</div>
    {/if}

    <ForumFooter
        type="forum"
        bind:isLike={forumDetail.isLike}
        bind:uuid={forumDetail.forumUUID}
        bind:isAnonymous={forumDetail.isAnonymous}
        bind:userUUID={forumDetail.authorUUID}
        bind:userDisplayName={forumDetail.authorName}
        bind:userImageURL={forumDetail.authorImageURL}
        bind:likeCount={forumDetail.likeCount}
        commentCount={forumDetail.commentCount || total}
        {label}
        bind:replyText={label}
        bind:createdAt
        bind:replyTrigger={replyForum}
        bind:isSortingComment={isShowSortingComment}
        bind:orderBy
        on:comment={event => commentForumAction(event.detail.comment, event.detail.attachments)}
    />
</div>

<CommentList bind:authorUUID={forumDetail.authorUUID} bind:forumUUID={forumDetail.forumUUID} bind:newComment bind:totalComments={total} bind:orderBy />