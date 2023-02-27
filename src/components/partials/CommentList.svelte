<script lang="ts">
	import type { Comment } from "@models/forum";
	import { getComments } from "@services/forum";
	import { onMount } from "svelte";
	import CommentCard from "./CommentCard.svelte";

    export let forumUUID: string;

    let offset = 0;
    let limit = 10;
    let comments: Comment[] = [];
    onMount(async () => {
        const response = await getComments(forumUUID, offset, limit)
        if (response) {
            comments = [...comments, ...response.data]
        }
    })
</script>

{#each comments as comment, commentIndex}
    <div class="mt-4">
        <CommentCard bind:comment label="Comment #{commentIndex+1}" reply>
            {#if comment.replyComments?.length}
                {#each comment.replyComments as replyComment, replyCommentIndex}
                    <div class="m-4">
                        <CommentCard bind:comment={replyComment} label="Comment #{commentIndex+1}.{replyCommentIndex+1}" />
                    </div>
                {/each}
            {/if}
        </CommentCard>
    </div>
{/each}