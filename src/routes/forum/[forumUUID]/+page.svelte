<script lang="ts">
	import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";
	import ForumDetail from "@components/forum/ForumDetail.svelte";
	import type { ForumDetail as ForumDetailModel } from '@models/forum';
	import CommentList from '@components/partials/CommentList.svelte';

    export let data: { forumDetail: ForumDetailModel }
</script>

<div class="mb-4">
    <Breadcrumb aria-label="SU Webboard">
        <BreadcrumbItem href="/" home>หน้าแรก</BreadcrumbItem>
        <BreadcrumbItem>กระทู้</BreadcrumbItem>
    </Breadcrumb>
</div>

<ForumDetail bind:forumDetail={data.forumDetail} />
<CommentList bind:forumUUID={data.forumDetail.forumUUID} />