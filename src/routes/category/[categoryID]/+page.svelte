<script lang="ts">
	import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
	import ForumList from '@components/shared/ForumList.svelte';
	import type { Category } from "@models/category";
	import { getForumListByCategoryID } from '@services/forum';

    export let data: Category;
    const category = data;

    let page = 1;
    let limit = 10;

    const fetchData = async () => await getForumListByCategoryID(category.categoryID, (page-1)*limit, limit)
</script>

<div class="mb-4">
    <Breadcrumb aria-label="SU Webboard">
        <BreadcrumbItem href="/" home>หน้าแรก</BreadcrumbItem>
        <BreadcrumbItem>หมวดหมู่</BreadcrumbItem>
        <BreadcrumbItem>{category?.categoryName}</BreadcrumbItem>
    </Breadcrumb>
</div>

<ForumList bind:page bind:limit {fetchData} />