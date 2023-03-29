<script lang="ts">
	import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";
	import { goto } from "$app/navigation";
	import HTTP from "@commons/http";
    import Alert from '@components/alert/Alert.svelte';
	import NewPost from "@components/shared/NewPost.svelte";
	import LoadingSpinner from "@components/spinner/LoadingSpinner.svelte";
	import type { Alert as AlertModel } from '@models/alert';
	import type { AnnouncementRequest } from "@models/announcement";
	import type { Attachment, FormSchema } from "@models/new-post";
	import { upsertAnnouncement } from "@services/announcement";

    let alert: AlertModel;
    let title: FormSchema = {value: "", label: "หัวข้อการประกาศ", placeholder: "กรุณาใส่หัวข้อสำหรับประกาศจากทางมหาวิทยาลัย..."}
    let description: FormSchema = {value: "", label: "รายละเอียด", placeholder: "กรุณาใส่รายละเอียด..."}
    let attachments: Attachment[] = [];
    let submitName = "ยืนยัน"
    let isLoading = false;
    let submit = async() => {
        const files = attachments.map(attachment => attachment.file)
        const announcement: AnnouncementRequest = {
            title: title.value,
            description: description.value,
        }
        isLoading = true;
        const res = await upsertAnnouncement(announcement, files)
        if (res.status === HTTP.StatusOK && res.data) {
            goto(`/announcement/${res.data.announcementUUID}`)
        } else {
            alert = {
                color: 'red',
                message: 'ขออภัย, ระบบเกิดความขัดข้อง กรุณาลองใหม่อีกครั้ง!',
            }
        }
        isLoading = false;
    }
</script>

<Alert bind:alert />

<LoadingSpinner bind:isLoading />

<div class="mb-4">
    <Breadcrumb aria-label="SU Webboard">
        <BreadcrumbItem href="/" home>หน้าแรก</BreadcrumbItem>
        <BreadcrumbItem href="/announcement/list">ประกาศ</BreadcrumbItem>
        <BreadcrumbItem>สร้างประกาศ</BreadcrumbItem>
    </Breadcrumb>
</div>

<div class="ease-in duration-200 bg-white dark:bg-gray-900 w-full rounded-md shadow-lg p-4 sm:p-6">
    <NewPost
        bind:title
        bind:description
        bind:attachments
        bind:submitName
        {submit}
        cancel={() => history.back()}
    />
</div>