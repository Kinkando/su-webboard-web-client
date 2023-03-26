<script lang="ts">
	import ForumImage from "../forum/ForumImage.svelte";
    import EllipsisMenu from "@components/shared/EllipsisMenu.svelte";
	import type { Announcement, AnnouncementRequest } from "@models/announcement";
	import type { Attachment, FormSchema } from "@models/new-post";
	import { getUserUUID } from "@util/localstorage";
	import { deleteAnnouncement, upsertAnnouncement } from "@services/announcement";
	import { createEventDispatcher } from "svelte";
	import AnnouncementFooter from "./AnnouncementFooter.svelte";

    export let announcementDetail: Announcement;

    // Edit modal
    let title: FormSchema = {value: announcementDetail.title, label: `หัวข้อประกาศ`, placeholder: `กรุณาใส่หัวข้อประกาศ...`}
    let description: FormSchema = {value: announcementDetail.description!, label: "รายละเอียด", placeholder: "กรุณาใส่รายละเอียด..."}
    let attachments: Attachment[] = [];

    function initImages() {
        const images = announcementDetail.announcementImages
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

    const editAnnouncementAction = async(titleEdit: string, descriptionEdit: string, attachmentsEdit: Attachment[], deleteImageUUIDs: string[]) => {
        const files = attachmentsEdit.map(attachment => attachment.file)
        const announcement: AnnouncementRequest = {
            announcementUUID: announcementDetail.announcementUUID,
            title: titleEdit,
            description: descriptionEdit,
            announcementImageUUIDs: deleteImageUUIDs,
        }
        const res = await upsertAnnouncement(announcement, files)

        // loading edit data
        announcementDetail.title = titleEdit;
        announcementDetail.description = descriptionEdit;
        title.value = titleEdit;
        description.value = descriptionEdit;
        if (deleteImageUUIDs && announcementDetail.announcementImages) {
            announcementDetail.announcementImages = announcementDetail.announcementImages?.filter(image => !deleteImageUUIDs.includes(image.uuid))
        }
        if (res.data?.documents) {
            if (announcementDetail.announcementImages) {
                announcementDetail.announcementImages = [...announcementDetail.announcementImages, ...res.data.documents]
            } else {
                announcementDetail.announcementImages = [...res.data.documents]
            }
        }
        imageURLs = initImages()
    }

    const deleteAnnouncementAction = async() => {
        await deleteAnnouncement(announcementDetail?.announcementUUID)
        window.location.href = '/'
    }

    $: userUUID = getUserUUID()
</script>

<div class="rounded-lg shadow-md w-full h-full p-4 sm:p-6 overflow-hidden bg-white text-black dark:bg-gray-700 dark:text-white ease-in duration-200">
    <div class="flex">
        <div class="w-full text-xl font-bold">
            {announcementDetail.title}
        </div>
        {#if announcementDetail.authorUUID === userUUID}
            <EllipsisMenu
                ellipsisMenuID={announcementDetail.announcementUUID}
                type={'announcement'}
                menuSuffixName={'ประกาศ'}
                editable
                removable
                {title}
                {description}
                {attachments}
                on:edit={(event) => editAnnouncementAction(event.detail.title, event.detail.description, event.detail.attachments, event.detail.deleteImageUUIDs)}
                on:delete={() => deleteAnnouncementAction()}
            />
        {/if}
    </div>

    <hr class="my-3 dark:border-gray-500">
    <div class="font-medium min-h-[12rem]">
        {announcementDetail.description}
    </div>

    {#if imageURLs?.length}
        <ForumImage {imageURLs} />
    {/if}

    <div class="flex justify-end items-center mt-3 -mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
            <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clip-rule="evenodd" />
        </svg>
        <div class="no-select ml-1 text-xs">{announcementDetail.seeCount} ผู้ชม</div>
    </div>

    <AnnouncementFooter
        username={announcementDetail.authorName}
        userImageURL={announcementDetail.authorImageURL}
        createdAt={announcementDetail.createdAt}
    />
</div>