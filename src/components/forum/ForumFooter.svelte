<script lang="ts">
	import CommentBadge from "@components/badge/CommentBadge.svelte";
	import LikeBadge from "@components/badge/LikeBadge.svelte";
	import { createEventDispatcher } from "svelte";

    export let likeCount: number | undefined = undefined;
    export let commentCount: number | undefined = undefined;
    export let username: string;
    export let userImageURL: string;

    const dispatch = createEventDispatcher();
	const dispatchAction = () => dispatch('click')
</script>

<div class="flex items-center justify-between mt-3 -mb-3">
    {#if likeCount}
        <div class="flex items-center font-bold">
            <LikeBadge {likeCount} toggle type="forum" />
        </div>
    {/if}
    {#if commentCount}
        <div class="flex items-center font-bold">
            <CommentBadge {commentCount} click on:click={dispatchAction} />
        </div>
    {/if}
</div>

<hr class="mt-6 mb-3 dark:border-gray-500">
<div class="flex justify-between items-center">
    <div class="flex items-center overflow-hidden">
        <img src={userImageURL} alt="" class="w-16 h-16">
        <div class="ml-3 space-y-1 overflow-hidden mr-4">
            <div class="font-bold overflow-hidden text-ellipsis whitespace-nowrap">{username}</div>
            <div class="font-light text-sm overflow-hidden text-ellipsis whitespace-nowrap">2 ชั่วโมง</div>
        </div>
    </div>
    {#if commentCount}
        <div class="no-select underline text-[var(--primary-color)] dark:text-[var(--primary-color-75)] cursor-pointer whitespace-nowrap">ตอบกลับ</div>
    {/if}
</div>