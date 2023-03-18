<script lang="ts">
	import { Breadcrumb, BreadcrumbItem, SpeedDial, SpeedDialButton } from "flowbite-svelte";
    import io from 'socket.io-client'
	import { onMount } from "svelte";
	import CommentList from '@components/comment/CommentList.svelte';
	import ForumDetail from "@components/forum/ForumDetail.svelte";
	import type { Category } from "@models/category";
	import type { ForumDetail as ForumDetailModel } from '@models/forum';
	import type { Comment } from '@models/comment';

    export let data: { forumDetail: ForumDetailModel, categories: Category[] }

    function goToTop() {
        window.scrollTo({top: 0, behavior: 'smooth'});
        // document.body.scrollTop = 0; // For Safari
        // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    let total = 0;
    let newComment: (comment: Comment) => any;
    let element: any;
    let replyForum = false;
    let scrollY = 0;
    $: isShowOnTop = scrollY > 0;

    onMount(() => {
        const socket = io(import.meta.env.VITE_API_HOST)
        socket.on('connect', () => {
            socket.emit('ping')
            console.log('ping')
        })
        socket.on('pong', (data) => console.log(data.message))
    })
</script>

<svelte:window bind:scrollY />

<div class="mb-4">
    <Breadcrumb aria-label="SU Webboard">
        <BreadcrumbItem href="/" home>หน้าแรก</BreadcrumbItem>
        <BreadcrumbItem>กระทู้</BreadcrumbItem>
    </Breadcrumb>
</div>

<ForumDetail bind:forumDetail={data.forumDetail} bind:categories={data.categories} bind:replyForum on:comment={(event) => newComment(event.detail)} bind:total />
<CommentList bind:this={element} bind:forumUUID={data.forumDetail.forumUUID} bind:newComment bind:totalComments={total} />

<SpeedDial defaultClass="fixed right-6 bottom-6 ease-in duration-200 z-50">
    <svg slot="icon" aria-hidden="true" class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
    {#if isShowOnTop}
        <SpeedDialButton name="Top" tooltip="left" on:click={goToTop}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
        </SpeedDialButton>
    {/if}
    <SpeedDialButton name="Comment" tooltip="left" on:click={() => replyForum = true}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
        </svg>
    </SpeedDialButton>
</SpeedDial>