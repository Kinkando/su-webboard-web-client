<script lang="ts">
	import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";
	import { goto } from "$app/navigation";
	import HTTP from "@commons/http";
	import ForumEditor from "@components/shared/ForumEditor.svelte";
	import LoadingSpinner from "@components/spinner/LoadingSpinner.svelte";
	import type { AnnouncementRequest } from "@models/announcement";
	import type { Attachment, FormSchema } from "@models/new-post";
	import { upsertAnnouncement } from "@services/announcement";
    import { alert } from "@stores/alert";

    let title: FormSchema = {value: "", label: "หัวข้อการประกาศ", placeholder: "กรุณากรอกหัวข้อสำหรับประกาศจากทางมหาวิทยาลัย..."}
    let description: FormSchema = {value: "", label: "รายละเอียด", placeholder: "กรุณากรอกรายละเอียด..."}
    let attachments: Attachment[] = [];
    let submitName = "ยืนยัน"
    let isLoading = false;
    let submit = async() => {
        const files = attachments.map(attachment => attachment.file)
        const announcement: AnnouncementRequest = {
            title: title.value.trim(),
            description: description.value,
        }
        isLoading = true;
        const res = await upsertAnnouncement(announcement, files)
        if (res.status === HTTP.StatusOK && res.data) {
            goto(`/announcement/${res.data.announcementUUID}`)
        } else {
            alert({
                type: 'error',
                message: 'ขออภัย, ระบบเกิดความขัดข้อง กรุณาลองใหม่อีกครั้ง!',
            })
        }
        isLoading = false;
    }
</script>

<LoadingSpinner bind:isLoading />

<div class="mb-4">
    <Breadcrumb aria-label="SU Webboard">
        <BreadcrumbItem href="/" home>หน้าแรก</BreadcrumbItem>
        <BreadcrumbItem href="/announcement/list">ประกาศ</BreadcrumbItem>
        <BreadcrumbItem>สร้างประกาศ</BreadcrumbItem>
    </Breadcrumb>
</div>

<div class="ease-in duration-200 bg-white dark:bg-gray-900 w-full rounded-md shadow-lg p-4 sm:p-6">
    <ForumEditor
        bind:title
        bind:description
        bind:attachments
        bind:submitName
        {submit}
        cancel={() => history.back()}
    />
</div>