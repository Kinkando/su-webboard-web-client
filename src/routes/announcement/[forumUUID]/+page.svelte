<script lang="ts">
	import ForumDetail from "@components/forum/ForumDetail.svelte";
	import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";
    import type { Announcement } from "@models/announcement";
	import type { ForumDetail as ForumDetailModel } from '@models/forum';

    export let data: { announcement: Announcement }
</script>

<div class="mb-4">
    <Breadcrumb aria-label="SU Webboard">
        <BreadcrumbItem href="/" home>หน้าแรก</BreadcrumbItem>
        <BreadcrumbItem href="/announcement/list">ประกาศ</BreadcrumbItem>
        <BreadcrumbItem>รายละเอียด</BreadcrumbItem>
    </Breadcrumb>
</div>

<ForumDetail bind:forumDetail={data.announcement} />