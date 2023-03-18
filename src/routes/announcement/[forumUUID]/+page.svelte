<script lang="ts">
	import AnnouncementDetail from "@components/announcement/AnnouncementDetail.svelte";
	import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";
    import type { Announcement } from "@models/announcement";

    export let data: { announcement: Announcement }
</script>

<div class="mb-4">
    <Breadcrumb aria-label="SU Webboard">
        <BreadcrumbItem href="/" home>หน้าแรก</BreadcrumbItem>
        <BreadcrumbItem href="/announcement/list">ประกาศ</BreadcrumbItem>
        <BreadcrumbItem>รายละเอียด</BreadcrumbItem>
    </Breadcrumb>
</div>

<AnnouncementDetail bind:announcementDetail={data.announcement} />