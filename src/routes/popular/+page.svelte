<script lang="ts">
	import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
	import ForumList from '@components/forum/ForumList.svelte';
	import { getForumListByPopular } from '@services/forum';

    let page = 1;
    let limit = 10;

    const fetchData = async () => await getForumListByPopular((page-1)*limit, limit)
</script>

<div class="mb-4">
    <Breadcrumb aria-label="SU Webboard">
        <BreadcrumbItem href="/" home>หน้าแรก</BreadcrumbItem>
        <BreadcrumbItem>กระทู้ยอดนิยม</BreadcrumbItem>
    </Breadcrumb>
</div>

<ForumList bind:page bind:limit {fetchData} isRanking />