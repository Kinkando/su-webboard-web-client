<script lang="ts">
	import ForumImage from "./ForumImage.svelte";
	import ForumFooter from "./ForumFooter.svelte";
	import CategoryBadge from "@components/badge/CategoryBadge.svelte";
    import EllipsisMenu from "@components/shared/EllipsisMenu.svelte";
    import type { ForumDetail, ForumRequest } from "@models/forum";
	import type { Attachment, FormSchema } from "@models/new-post";
	import type { Category } from "@models/category";
	import { defined } from "@util/generic";
	import { getUserUUID } from "@util/localstorage";
	import { deleteForum, upsertForum } from "@services/forum";
	import { upsertComment } from "@services/comment";
	import { createEventDispatcher } from "svelte";

    export let forumDetail: ForumDetail;
    export let categories: Category[];
    export let replyForum = false;
    export let total = 0;

    // Edit modal
    let title: FormSchema = {value: forumDetail.title, label: `หัวข้อกระทู้`, placeholder: `กรุณาใส่หัวข้อกระทู้...`}
    let description: FormSchema = {value: forumDetail.description!, label: "รายละเอียด", placeholder: "กรุณาใส่รายละเอียด..."}
    let attachments: Attachment[] = [];
    let label = "แสดงความคิดเห็น"

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

    let imageURLs = initImages()

    const dispatch = createEventDispatcher()

    const editForumAction = async(titleEdit: string, descriptionEdit: string, categoriesEdit: Category[], attachmentsEdit: Attachment[], deleteImageUUIDs: string[]) => {
        const files = attachmentsEdit.map(attachment => attachment.file)
        const categoryIDs = categoriesEdit.filter(category => category.isActive).map(category => category.categoryID!)
        const forum: ForumRequest = {
            forumUUID: forumDetail.forumUUID,
            title: titleEdit,
            description: descriptionEdit,
            categoryIDs,
            forumImageUUIDs: deleteImageUUIDs,
        }
        const res = await upsertForum(forum, files)

        // loading edit data
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

    const deleteForumAction = async() => {
        await deleteForum(forumDetail?.forumUUID)
        window.location.href = '/'
    }

    const reportForumAction = async(reason: string) => {
        console.log(`รายงานกระทู้: ${forumDetail.forumUUID}: ${reason}`)
    }

    const commentForumAction = async(commentText: string, attachments: Attachment[]) => {
        const files = attachments.map(attachment => attachment.file)
        const comment: any = {
            commentText,
            forumUUID: forumDetail.forumUUID,
        }
        const res = await upsertComment(forumDetail.forumUUID, comment, files)
        if (res?.data) {
            comment.commentUUID = res.data.commentUUID
            comment.commentImages = res.data.documents
            dispatch('comment', comment)
        }
    }

    $: userUUID = getUserUUID()
</script>

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
            {title}
            {description}
            {categories}
            {attachments}
            on:edit={(event) => editForumAction(event.detail.title, event.detail.description, event.detail.categories, event.detail.attachments, event.detail.deleteImageUUIDs)}
            on:report={(event) => reportForumAction(event.detail.reportText)}
            on:delete={() => deleteForumAction()}
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
    </div>

    {#if imageURLs?.length}
        <ForumImage {imageURLs} />
    {/if}

    <ForumFooter
        type="forum"
        isLike={forumDetail.isLike}
        uuid={forumDetail.forumUUID}
        username={forumDetail.authorName}
        userImageURL={forumDetail.authorImageURL}
        likeCount={forumDetail.likeCount}
        commentCount={forumDetail.commentCount || total}
        {label}
        replyText={label}
        createdAt={forumDetail.createdAt}
        bind:replyTrigger={replyForum}
        on:comment={event => commentForumAction(event.detail.comment, event.detail.attachments)}
    />
</div>