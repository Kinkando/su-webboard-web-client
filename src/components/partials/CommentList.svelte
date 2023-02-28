<script lang="ts">
    import { onMount } from "svelte";
    import { inview } from "svelte-inview/dist/index";
	import SyncLoader from 'svelte-loading-spinners/SyncLoader.svelte';
	import CommentCard from "./CommentCard.svelte";
	import type { Comment } from "@models/forum";
	import { getComments } from "@services/forum";

    export let forumUUID: string;

    let offset = 0;
    let limit = 10;
    let comments: Comment[] = [];
    let hasMore = true;
    let isLoadMore = true;

    onMount(() => fetchData())

    async function fetchData() {
        isLoadMore = true;
        const response = await getComments(forumUUID, offset, limit)
        isLoadMore = false;
        hasMore = response != null && response.data.length > 0
        if (response) {
            comments = [...comments, ...response.data]
        }
    }

    function load(e: CustomEvent<ObserverEventDetails>) {
        if (e.detail.inView && hasMore) {
            offset += limit;
            fetchData();
        }
    }
</script>

{#each comments as comment, commentIndex}
    <div class="mt-4">
        <CommentCard bind:comment label="ความคิดเห็นที่ {commentIndex+1}" reply>
            {#if comment.replyComments?.length}
                {#each comment.replyComments as replyComment, replyCommentIndex}
                    <div class="m-4">
                        <CommentCard bind:comment={replyComment} label="ความคิดเห็นที่ {commentIndex+1}.{replyCommentIndex+1}" />
                    </div>
                {/each}
            {/if}
        </CommentCard>
    </div>
{/each}

{#if isLoadMore}
    <div class="flex justify-center mt-4">
        <SyncLoader color="green" size="60" />
    </div>
{/if}

<div use:inview={{}} on:change={load} />