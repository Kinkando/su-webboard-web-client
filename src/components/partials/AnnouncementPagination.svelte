<script lang="ts">
	import AnnouncementList from "@components/announcement/AnnouncementList.svelte";
	import type { Announcement } from "@models/announcement";
	import { getAnnouncements } from "@services/announcement";

    export let userUUID: string

    let page = 1;
    let limit = 10;

    const fetchData = async () => {
        const { data, total } = await getAnnouncements((page-1)*limit, limit, userUUID)
        const announcements: Announcement[] = [];
        data.forEach(announcement => {
            announcements.push({
                announcementUUID: announcement.announcementUUID,
                title: announcement.title,
                authorImageURL: announcement.authorImageURL,
                authorName: announcement.authorName,
                authorUUID: announcement.authorUUID,
                seeCount: announcement.seeCount,
                createdAt: announcement.createdAt,
                updatedAt: announcement.updatedAt,
            })
        })
        return { data: announcements, total }
    }
</script>

<AnnouncementList bind:page bind:limit {fetchData} />