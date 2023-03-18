<script lang="ts">
    import { onMount } from "svelte";
    import { inview } from "svelte-inview";
	import SyncLoader from 'svelte-loading-spinners/SyncLoader.svelte';
	import CommentCard from "./CommentCard.svelte";
	import type { Comment } from "@models/comment";
	import { getComments } from "@services/comment";
	import { Button } from "flowbite-svelte";

    export let forumUUID: string;

    let offset = 0;
    let limit = 10;
    let comments: Comment[] = [];
    let hasMore = true;
    const replyLimit = 5;

    onMount(() => fetchData())

    async function fetchData() {
        const response = await getComments(forumUUID, offset, limit)
        if (response?.data) {
            for(let comment of response.data) {
                comment.replyCursor = Math.min(comment.replyComments?.length || 0, replyLimit);
            }
        }
        hasMore = response != null && response.data?.length > 0
        if (response?.data) {
            comments = [...comments, ...response.data]
        }
    }

    function load(e: CustomEvent<ObserverEventDetails>) {
        if (e.detail.inView && hasMore) {
            offset += limit;
            fetchData();
        }
    }

    $: canSeeMore = (index: number) => comments[index]?.replyCursor! < comments[index]?.replyComments!.length
    $: seeMore = (index: number) => {
        if (comments[index] && comments[index].replyComments && comments[index].replyCursor) {
            comments[index].replyCursor! += Math.min(comments[index].replyComments!.length - comments[index].replyCursor!, replyLimit)
        }
    }
</script>

{#each comments as comment, commentIndex}
    <div class="mt-4">
        <CommentCard bind:comment label="ความคิดเห็นที่ {commentIndex+1}" reply>
            {#if comment.replyComments?.length}
                {#each comment.replyComments.slice(0, comment.replyCursor) as replyComment, replyCommentIndex}
                    <div class="m-4">
                        <CommentCard bind:comment={replyComment} label="ความคิดเห็นที่ {commentIndex+1}.{replyCommentIndex+1}" />
                    </div>
                {/each}
                {#if canSeeMore(commentIndex)}
                    <div class="flex justify-center">
                        <Button color="green" gradient size="sm" on:click={() => seeMore(commentIndex)} class="m-auto">
                            <span class="mr-2">ดูความคิดเห็นตอบกลับเพิ่มเติม</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </Button>
                    </div>
                {/if}
            {/if}
        </CommentCard>
    </div>
{/each}

{#if hasMore}
    <div class="flex justify-center mt-4">
        <SyncLoader color="green" size="60" />
    </div>
{/if}

<div use:inview={{}} on:change={load} />