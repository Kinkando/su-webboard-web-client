<script lang="ts">
	import ForumImage from "./ForumImage.svelte";
	import ForumFooter from "./ForumFooter.svelte";
	import CategoryBadge from "@components/badge/CategoryBadge.svelte";
    import EllipsisMenu from "@components/shared/EllipsisMenu.svelte";
	import type { Announcement } from "@models/announcement";
    import type { Document, ForumDetail, ForumRequest } from "@models/forum";
	import type { Attachment, FormSchema } from "@models/new-post";
	import type { Category } from "@models/category";
	import { defined } from "@util/generic";
	import { getUserUUID } from "@util/localstorage";
	import { deleteForum, upsertForum } from "@services/forum";
	import { goto } from "$app/navigation";

    export let forumDetail: ForumDetail | Announcement;
    export let categories: Category[] | undefined = undefined;
    export let replyForum = false;

    const type = instanceOfForumDetail(forumDetail) ? 'กระทู้' : 'การประกาศ'

    // Edit modal
    let title: FormSchema = {value: forumDetail.title, label: `หัวข้อ${type}`, placeholder: `กรุณาใส่หัวข้อ${type}...`}
    let description: FormSchema = {value: forumDetail.description!, label: "รายละเอียด", placeholder: "กรุณาใส่รายละเอียด..."}
    let attachments: Attachment[] = [];
    let label = "แสดงความคิดเห็น"

    function instanceOfForumDetail(object: any): object is ForumDetail {
        return object && 'categories' in object;
    }

    function initImages() {
        const images = instanceOfForumDetail(forumDetail) ? forumDetail.forumImages : forumDetail.announcementImages
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

        // const images = attachmentsEdit.map(attachment => {
        //     return {
        //         url: URL.createObjectURL(attachment.file),
        //     } as Document
        // })
        if (instanceOfForumDetail(forumDetail)) {
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
        } else {
            if (deleteImageUUIDs && forumDetail.announcementImages) {
                forumDetail.announcementImages = forumDetail.announcementImages?.filter(image => !deleteImageUUIDs.includes(image.uuid))
            }
            if (res.data?.documents) {
                if (forumDetail.announcementImages) {
                    forumDetail.announcementImages = [...forumDetail.announcementImages, ...res.data.documents]
                } else {
                    forumDetail.announcementImages = [...res.data.documents]
                }
            }
        }
        imageURLs = initImages()
    }

    const deleteForumAction = async() => {
        await deleteForum(forumDetail?.forumUUID)
        goto('')
    }

    const reportForumAction = async(reason: string) => {
        console.log(`รายงาน${type}: ${forumDetail.forumUUID}: ${reason}`)
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
            type={type === "กระทู้" ? 'forum': 'announcement'}
            menuSuffixName={type}
            editable={forumDetail.authorUUID === userUUID}
            reportable={type === "กระทู้" && forumDetail.authorUUID !== userUUID}
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
    {#if instanceOfForumDetail(forumDetail) && forumDetail.categories?.length}
        <div class="flex flex-wrap items-center gap-1 mt-1">
            {#each forumDetail.categories as category}
                <CategoryBadge categoryID={defined(category.categoryID)} categoryName={category.categoryName} categoryHexColor={category.categoryHexColor} />
            {/each}
        </div>
    {/if}

    <hr class="my-3 dark:border-gray-500">
    <div class="font-medium">
        {forumDetail.description}
    </div>

    {#if imageURLs?.length}
        <ForumImage {imageURLs} />
    {/if}

    <ForumFooter
        username={forumDetail.authorName}
        userImageURL={forumDetail.authorImageURL}
        likeCount={instanceOfForumDetail(forumDetail) ? forumDetail.likeCount : undefined}
        commentCount={instanceOfForumDetail(forumDetail) ? forumDetail.commentCount : undefined}
        {label}
        replyText={label}
        createdAt={forumDetail.createdAt}
        bind:replyTrigger={replyForum}
        on:comment={event => console.log("แสดงความคิดเห็น", event.detail.comment, event.detail.attachments.length)}
    />
</div>