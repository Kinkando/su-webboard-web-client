<script lang="ts">
	import { onMount } from 'svelte';
	import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";
	import ForumDetail from "@components/shared/ForumDetail.svelte";
	import type { ForumDetail as ForumDetailModel } from '@models/forum';

    export let data: { forumDetail: ForumDetailModel }

    onMount(async () => {
    })
</script>

<div class="mb-4">
    <Breadcrumb aria-label="SU Webboard">
        <BreadcrumbItem href="/" home>หน้าแรก</BreadcrumbItem>
        <BreadcrumbItem>กระทู้</BreadcrumbItem>
    </Breadcrumb>
</div>

<ForumDetail bind:forumDetail={data.forumDetail} />