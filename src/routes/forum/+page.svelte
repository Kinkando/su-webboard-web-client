<script lang="ts">
	import { goto } from "$app/navigation";
	import HTTP from "@commons/http";
	import NewPost from "@components/shared/NewPost.svelte";
	import LoadingSpinner from "@components/spinner/LoadingSpinner.svelte";
	import type { Category } from "@models/category";
	import type { ForumRequest } from "@models/forum";
	import type { Attachment, FormSchema } from "@models/new-post";
	import type { User } from "@models/user";
	import { getAllCategories } from "@services/category";
	import { upsertForum } from "@services/forum";
	import { getUserProfile } from "@services/user";
	import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";
	import { onMount } from "svelte";

    let title: FormSchema = {value: "", label: "หัวข้อกระทู้", placeholder: "กรุณาใส่หัวข้อกระทู้..."}
    let description: FormSchema = {value: "", label: "รายละเอียด", placeholder: "กรุณาใส่รายละเอียด..."}
    let categories: Category[] = [];
    let attachments: Attachment[] = [];
    let submitName = "สร้างกระทู้";
    let submit = async() => {
        const files = attachments.map(attachment => attachment.file)
        const categoryIDs = categories.filter(category => category.isActive).map(category => category.categoryID!)
        const forum: ForumRequest = {
            title: title.value,
            description: description.value,
            categoryIDs,
            isAnonymous,
        }
        isLoading = true;
        const res = await upsertForum(forum, files)
        isLoading = false;
        if (res.status === HTTP.StatusOK && res.data) {
            goto(`/forum/${res.data.forumUUID}`)
        }
    }

    let isAnonymous = false;
    let isLoading = true;
    let user: User
    onMount(async() => {
        categories = (await getAllCategories())!
        user = await getUserProfile();
        isAnonymous = user.isAnonymous!
        isLoading = false;
    })
</script>

<div class="mb-4">
    <Breadcrumb aria-label="SU Webboard">
        <BreadcrumbItem href="/" home>หน้าแรก</BreadcrumbItem>
        <BreadcrumbItem>สร้างกระทู้</BreadcrumbItem>
    </Breadcrumb>
</div>

<LoadingSpinner bind:isLoading />

<div class="ease-in duration-200 bg-white dark:bg-gray-900 w-full rounded-md shadow-lg p-4 sm:p-6">
    <NewPost
        anonymousePost
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