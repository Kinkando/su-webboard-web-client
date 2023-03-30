<script lang="ts">
    import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
	import { onDestroy, onMount } from 'svelte';
    import { page } from '$app/stores';
	import ForumList from '@components/forum/ForumList.svelte';
	import type { Category } from "@models/category";
	import { getCategoryByID } from '@services/category';
	import { getForumListByCategoryID } from '@services/forum';

    $: categoryID = Number($page.params.categoryID)
    $: categoryName = category?.categoryName ?? periodText

    let currentPage = 1;
    let limit = 10;
    let category: Category;
    onMount(async() => {
        const res = await getCategoryByID(categoryID)
        clearInterval(period)
        if (res) {
            category = res
        } else {
            periodText = 'ไม่พบหมวดหมู่'
        }
    })
    onDestroy(() => clearInterval(period))

    let periodText = "."
    const period = setInterval(() => {
        if (periodText.length === 5) {
            periodText = ""
        }
        periodText += "."
    }, 300)

    const fetchData = async () => await getForumListByCategoryID(categoryID, (currentPage-1)*limit, limit)
</script>

<div class="mb-4">
    <Breadcrumb aria-label="SU Webboard">
        <BreadcrumbItem href="/" home>หน้าแรก</BreadcrumbItem>
        <BreadcrumbItem>กระทู้</BreadcrumbItem>
        <BreadcrumbItem>{categoryName}</BreadcrumbItem>
    </Breadcrumb>
</div>

<ForumList bind:page={currentPage} bind:limit {fetchData} />