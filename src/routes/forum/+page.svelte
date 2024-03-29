<script lang="ts">
	import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import HTTP from "@commons/http";
	import ForumEditor from "@components/shared/ForumEditor.svelte";
	import LoadingSpinner from "@components/spinner/LoadingSpinner.svelte";
	import type { Category } from "@models/category";
	import type { ForumRequest } from "@models/forum";
	import type { Attachment, FormSchema } from "@models/new-post";
	import type { User } from "@models/user";
	import { getAllCategories } from "@services/category";
	import { upsertForum } from "@services/forum";
	import { getUserProfile } from "@services/user";
    import { alert } from "@stores/alert";

    let title: FormSchema = {value: "", label: "หัวข้อกระทู้", placeholder: "กรุณากรอกหัวข้อกระทู้...", maxLength: 100}
    let description: FormSchema = {value: "", label: "รายละเอียด", placeholder: "กรุณากรอกรายละเอียด...", maxLength: 10000}
    let categories: Category[] = [];
    let attachments: Attachment[] = [];
    let submitName = "สร้างกระทู้";
    let submit = async() => {
        const files = attachments.map(attachment => attachment.file)
        const categoryIDs = categories.filter(category => category.isActive).map(category => category.categoryID!)
        const forum: ForumRequest = {
            title: title.value.trim(),
            description: description.value,
            categoryIDs,
            isAnonymous,
        }
        isLoading = true;
        const res = await upsertForum(forum, files)
        if (res.status === HTTP.StatusOK && res.data) {
            goto(`/forum/${res.data.forumUUID}`)
        } else {
            alert({
                type: 'error',
                message: 'ขออภัย, ระบบเกิดความขัดข้อง กรุณาลองใหม่อีกครั้ง!',
            })
        }
        isLoading = false;
    }

    let isAnonymous = false;
    let isLoading = true;
    let user: User
    onMount(async() => {
        categories = (await getAllCategories())!
        user = await getUserProfile();
        isLoading = false;
    })
</script>

<div class="mb-4">
    <Breadcrumb aria-label="SU Webboard">
        <BreadcrumbItem href="/" home>หน้าแรก</BreadcrumbItem>
        <BreadcrumbItem>กระทู้</BreadcrumbItem>
        <BreadcrumbItem>สร้างกระทู้</BreadcrumbItem>
    </Breadcrumb>
</div>

<LoadingSpinner bind:isLoading />

<div class="ease-in duration-200 bg-white dark:bg-gray-900 w-full rounded-md shadow-lg p-4 sm:p-6 max-w-5xl m-auto">
    <ForumEditor
        anonymousPost
        bind:isAnonymous
        bind:user
        bind:title
        bind:description
        bind:categories
        bind:attachments
        bind:submitName
        {submit}
        cancel={() => history.back()}
    />
</div>