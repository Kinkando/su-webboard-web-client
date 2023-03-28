<script lang="ts">
    import { inview } from "svelte-inview";
	import SyncLoader from 'svelte-loading-spinners/SyncLoader.svelte';
	import CommentCard from "./CommentCard.svelte";
	import type { Comment } from "@models/comment";
	import { getComment, getComments } from "@services/comment";
	import { Button } from "flowbite-svelte";
	import { Order } from "@commons/order";

    export let authorUUID: string;
    export let orderBy: Order;
    export let totalComments = 0;
    export let forumUUID: string;
    export const newComment = async (cm: Comment) => {
        if (totalComments !== comments.length && orderBy === Order.ASC) {
            return;
        }
        const res = await getComment(forumUUID, cm.commentUUID)
        if (res) {
            res.isLike = false;
            res.likeCount = 0;
            res.replyCursor = 0;
            res.replyComments = [];
            if (!comments.find(comment => comment.commentUUID === res.commentUUID)) {
                comments = orderBy === Order.ASC ? [...comments, res] : [res, ...comments]
                totalComments++;
            }
        }
    }

    let isRefresh = false;
    $: orderBy && initialSort()
    async function initialSort() {
        comments = []
        totalComments = 0;
        offset = 0;
        hasMore = true;
        isRefresh = true;
        await fetchData();
        isRefresh = false;
    }

    let offset = 0;
    let limit = 10;
    let comments: Comment[] = [];
    let hasMore = true;
    const replyStart = 0;
    const replyLimit = 5;

    async function fetchData() {
        const response = await getComments(forumUUID, offset, limit, orderBy)
        if (response?.data) {
            for(let comment of response.data) {
                comment.replyCursor = Math.min(comment.replyComments?.length || 0, replyStart);
            }

            const tempComments: Comment[] = []
            response.data.forEach(comment => {
                if (!comments.find(c => c.commentUUID === comment.commentUUID)) {
                    if (comment.replyComments && orderBy === Order.DESC) {
                        comment.replyComments = comment.replyComments.reverse()
                    }
                    tempComments.push(comment)
                }
            })
            comments = [...comments, ...tempComments]
        }
        totalComments = response?.total || 0;
    }

    function load(e: CustomEvent<ObserverEventDetails>) {
        hasMore = comments.length < totalComments
        if (e.detail.inView && hasMore) {
            offset += limit;
            fetchData();
        }
    }

    $: canSeeMore = (index: number) => comments[index]?.replyCursor! < comments[index]?.replyComments!.length
    $: seeMore = (index: number) => {
        if (comments[index] && comments[index].replyComments && comments[index].replyCursor !== undefined) {
            comments[index].replyCursor! += Math.min(comments[index].replyComments!.length - comments[index].replyCursor!, replyLimit)
        }
    }

    const deleteView = async (commentIndex: number, replyIndex?: number) => {
        if (replyIndex === undefined) {
            comments = comments.filter((_, index) => commentIndex !== index)
            totalComments--;
        } else {
            comments[commentIndex].replyComments = comments[commentIndex].replyComments!.filter((_, index) => replyIndex !== index)
            comments[commentIndex].replyCursor!--;
        }
    }

    const createView = async(commentIndex: number, newComment: Comment) => {
        if (comments[commentIndex].replyCursor === comments[commentIndex].replyComments?.length) {
            comments[commentIndex].replyCursor!++;
        }
        if (comments[commentIndex].replyComments) {
            comments[commentIndex].replyComments = orderBy === Order.ASC ? [...comments[commentIndex].replyComments!, newComment] : [newComment, ...comments[commentIndex].replyComments!]
        } else {
            comments[commentIndex].replyComments = [newComment]
        }
    }

    $: commentNo = (no: number): number => orderBy === Order.DESC ? (totalComments - no) : (no+1)
    const replyCommentNo = (no: number, totalReplyComments: number): number => orderBy === Order.DESC ? (totalReplyComments - no) : (no+1)
</script>

{#each comments as comment, commentIndex}
    <div class="mt-4">
        <CommentCard
            {authorUUID}
            {forumUUID}
            bind:comment
            label="ความคิดเห็นที่ {commentNo(commentIndex)}"
            on:create={event => createView(commentIndex, event.detail.comment)}
            on:delete={() => deleteView(commentIndex)}
        >
            {#if comment.replyComments?.length}
                {#each comment.replyComments.slice(0, comment.replyCursor) as replyComment, replyCommentIndex}
                    <div class="mt-4 ml-8">
                        <CommentCard
                            {authorUUID}
                            replyCommentUUID={comment.commentUUID}
                            {forumUUID}
                            bind:comment={replyComment}
                            label="ความคิดเห็นที่ {commentNo(commentIndex)}.{replyCommentNo(replyCommentIndex, comment.replyComments.length)}"
                            on:delete={() => deleteView(commentIndex, replyCommentIndex)}
                        />
                    </div>
                {/each}
                {#if canSeeMore(commentIndex)}
                    <div class="mt-4 flex justify-center">
                        <Button color="green" gradient size="sm" on:click={() => seeMore(commentIndex)} class="m-auto">
                            <span class="mr-2">{ comment.replyCursor === replyStart ? `ดู ${comment.replyComments.length - replyStart} ความคิดเห็นย่อย` : 'ดูความคิดเห็นย่อยถัดไป' }</span>
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

{#if hasMore || isRefresh}
    <div class="flex justify-center mt-4">
        <SyncLoader color="green" size="60" />
    </div>
{/if}

<div use:inview={{}} on:change={load} />