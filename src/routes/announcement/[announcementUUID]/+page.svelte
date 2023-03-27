<script lang="ts">
	import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import AnnouncementDetail from "@components/announcement/AnnouncementDetail.svelte";
	import NotFound from "@components/shared/NotFound.svelte";
	import SkeletonForumDetail from "@components/skeleton-load/SkeletonForumDetail.svelte";
    import type { Announcement } from "@models/announcement";
	import { getAnnouncementDetail } from "@services/announcement";

    export let data: { announcement: Announcement }

    $: announcementUUID = $page.params.announcementUUID;

    let isLoading = true;
    onMount(async() => {
        const announcement = await getAnnouncementDetail(announcementUUID)
        if (announcement?.announcementUUID) {
            data = { announcement }
        }
        isLoading = false;
    })
</script>

<div class="mb-4">
    <Breadcrumb aria-label="SU Webboard">
        <BreadcrumbItem href="/" home>หน้าแรก</BreadcrumbItem>
        <BreadcrumbItem href="/announcement/list">ประกาศ</BreadcrumbItem>
        <BreadcrumbItem>รายละเอียด</BreadcrumbItem>
    </Breadcrumb>
</div>

{#if isLoading}
    <SkeletonForumDetail />
{:else if data && data.announcement}
    <AnnouncementDetail bind:announcementDetail={data.announcement} />
{:else}
    <NotFound />
{/if}