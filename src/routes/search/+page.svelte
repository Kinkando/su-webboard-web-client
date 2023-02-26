<script lang="ts">
    import { page } from "$app/stores";
	import ForumList from "@components/shared/ForumList.svelte";
	import type { ForumFilter } from "@models/forum";
	import { searchForum } from "@services/forum";
	import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";

    $: searchText = $page.url.searchParams.get('keyword')
    $: if (searchText) {
        filter.searchText = searchText
    }

    let currentPage = 1;
    let limit = 10;
    let filter: ForumFilter = { searchText: searchText || "" };

    const fetchData = async () => await searchForum(filter, (currentPage-1)*limit, limit)
</script>

<div class="mb-4">
    <Breadcrumb aria-label="SU Webboard">
        <BreadcrumbItem href="/" home>หน้าแรก</BreadcrumbItem>
        <BreadcrumbItem>ค้นหากระทู้</BreadcrumbItem>
    </Breadcrumb>
</div>

<ForumList bind:page={currentPage} bind:limit {fetchData} />