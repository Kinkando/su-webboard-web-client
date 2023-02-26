<script lang="ts">
	import ForumList from "@components/shared/ForumList.svelte";
	import type { Forum } from "@models/forum";
	import { getAnnouncements } from "@services/forum";
	import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";

    let page = 1;
    let limit = 10;

    const fetchData = async () => {
        const { data, total } = await getAnnouncements((page-1)*limit, limit)
        const forums: Forum[] = [];
        data.forEach(announcement => {
            forums.push({
                forumUUID: announcement.forumUUID,
                title: announcement.title,
                authorImageURL: announcement.authorImageURL,
                authorName: announcement.authorName,
                authorUUID: announcement.authorUUID,
                createdAt: announcement.createdAt,
            })
        })
        return { data: forums, total }
    }
</script>

<div class="mb-4">
    <Breadcrumb aria-label="SU Webboard">
        <BreadcrumbItem href="/" home>หน้าแรก</BreadcrumbItem>
        <BreadcrumbItem>ประกาศ</BreadcrumbItem>
    </Breadcrumb>
</div>

<ForumList bind:page bind:limit {fetchData} isAnnouncement />