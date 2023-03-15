<script lang="ts">
	import NewPost from "@components/shared/NewPost.svelte";
	import type { Category } from "@models/category";
	import type { Attachment, FormSchema } from "@models/new-post";
	import { getAllCategories } from "@services/category";
	import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";
	import { onMount } from "svelte";

    let title: FormSchema = {value: "", label: "หัวข้อกระทู้", placeholder: "กรุณาใส่หัวข้อกระทู้..."}
    let description: FormSchema = {value: "", label: "รายละเอียด", placeholder: "กรุณาใส่รายละเอียด..."}
    let categories: Category[] = [];
    let attachments: Attachment[] = [];
    let submitName = "สร้างกระทู้";
    let submit = async() => console.log(title.value, description.value, categories, attachments.length)

    let isLoading = true;
    onMount(async() => {
        categories = (await getAllCategories())!
        isLoading = false;
    })
</script>

<div class="mb-4">
    <Breadcrumb aria-label="SU Webboard">
        <BreadcrumbItem href="/" home>หน้าแรก</BreadcrumbItem>
        <BreadcrumbItem>สร้างกระทู้</BreadcrumbItem>
    </Breadcrumb>
</div>

<div class="ease-in duration-200 bg-white dark:bg-gray-900 w-full rounded-md shadow-lg p-4 sm:p-6">
    <NewPost
        bind:title
        bind:description
        bind:categories
        bind:attachments
        bind:submitName
        {submit}
        cancel={() => history.back()}
    />
</div>