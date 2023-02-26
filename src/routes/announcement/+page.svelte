<script lang="ts">
	import NewPost from "@components/shared/NewPost.svelte";
	import type { Attachment, FormSchema } from "@models/new-post";
	import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";

    let title: FormSchema = {value: "", label: "หัวข้อการประกาศ", placeholder: "กรุณาใส่หัวข้อสำหรับประกาศจากทางมหาวิทยาลัย..."}
    let description: FormSchema = {value: "", label: "รายละเอียด", placeholder: "กรุณาใส่รายละเอียด..."}
    let attachments: Attachment[] = [];
    let submitName = "ยืนยัน"
    let submit = async() => console.log(title.value, description.value, attachments.length)
</script>

<div class="mb-4">
    <Breadcrumb aria-label="SU Webboard">
        <BreadcrumbItem href="/" home>หน้าแรก</BreadcrumbItem>
        <BreadcrumbItem href="/announcement/list">ประกาศ</BreadcrumbItem>
        <BreadcrumbItem>สร้างประกาศ</BreadcrumbItem>
    </Breadcrumb>
</div>

<NewPost bind:title bind:description bind:attachments bind:submitName {submit} />