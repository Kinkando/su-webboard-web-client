<script lang="ts">
	import AnnouncementList from "@components/announcement/AnnouncementList.svelte";
	import type { Announcement } from "@models/announcement";
	import { getAnnouncements } from "@services/announcement";
	import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";

    let page = 1;
    let limit = 10;

    const fetchData = async () => {
        const { data, total } = await getAnnouncements((page-1)*limit, limit)
        const announcements: Announcement[] = [];
        data.forEach(announcement => {
            announcements.push({
                announcementUUID: announcement.announcementUUID,
                title: announcement.title,
                authorImageURL: announcement.authorImageURL,
                authorName: announcement.authorName,
                authorUUID: announcement.authorUUID,
                createdAt: announcement.createdAt,
            })
        })
        return { data: announcements, total }
    }
</script>

<div class="mb-4">
    <Breadcrumb aria-label="SU Webboard">
        <BreadcrumbItem href="/" home>หน้าแรก</BreadcrumbItem>
        <BreadcrumbItem>ประกาศ</BreadcrumbItem>
    </Breadcrumb>
</div>

<AnnouncementList bind:page bind:limit {fetchData} />