<script lang="ts">
	import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";
	import ForumDetail from "@components/forum/ForumDetail.svelte";
	import type { ForumDetail as ForumDetailModel } from '@models/forum';
	import CommentList from '@components/comment/CommentList.svelte';
	import type { Category } from "@models/category";

    export let data: { forumDetail: ForumDetailModel, categories: Category[] }
</script>

<div class="mb-4">
    <Breadcrumb aria-label="SU Webboard">
        <BreadcrumbItem href="/" home>หน้าแรก</BreadcrumbItem>
        <BreadcrumbItem>กระทู้</BreadcrumbItem>
    </Breadcrumb>
</div>

<ForumDetail bind:forumDetail={data.forumDetail} bind:categories={data.categories} />
<CommentList bind:forumUUID={data.forumDetail.forumUUID} />