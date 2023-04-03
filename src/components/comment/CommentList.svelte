<script lang="ts">
    import { inview } from "svelte-inview";
	import SyncLoader from 'svelte-loading-spinners/SyncLoader.svelte';
	import { Button } from "flowbite-svelte";
	import { page } from '$app/stores';
	import CommentCard from "./CommentCard.svelte";
	import { SocketEvent } from "@commons/socket-event";
	import type { Comment } from "@models/comment";
	import { Order } from "@commons/order";
	import { getComment, getComments } from "@services/comment";
    import socket from '@stores/socket'
	import { getSessionUUID } from "@util/localstorage";

    export let authorUUID: string;
    export let orderBy: Order;
    export let totalComments = 0;
    export let forumUUID: string;
    export const newComment = async (cm: Comment, replyCommentUUID?: string) => {
        if (totalComments !== comments.length && orderBy === Order.ASC) {
            return;
        }
        const res = await getComment(forumUUID, cm.commentUUID)
        if (res) {
            res.isLike = false;
            res.likeCount = 0;
            const isNewComment = !comments.find(comment => {
                if (replyCommentUUID && comment.replyComments) {
                    return comment.replyComments.find(replyComment => replyComment.commentUUID === res.commentUUID)
                }
                return comment.commentUUID === res.commentUUID
            })
            if (isNewComment) {
                if (!replyCommentUUID) {
                    // new comment
                    res.replyCursor = 0;
                    res.replyComments = [];
                    comments = orderBy === Order.ASC ? [...comments, res] : [res, ...comments]
                    totalComments++;
                } else {
                    // new reply comment
                    for(let i=0; i<comments.length; i++) {
                        const comment = comments[i];
                        if (comment.commentUUID === replyCommentUUID) {
                            if (comment.replyCursor === comment.replyComments?.length) {
                                comments[i].replyCursor!++;
                            }
                            if (comment.replyComments) {
                                comments[i].replyComments = orderBy === Order.ASC ? [...comment.replyComments!, res] : [res, ...comment.replyComments!]
                            } else {
                                comments[i].replyComments = [res]
                            }
                            break
                        }
                    }
                }
            }
        }
    }

    let isFetch = true;
    $: commentUUID = $page.url.searchParams.get('commentUUID')
    $: if (commentUUID?.length && comments.length && isFetch) {
        fetchUntilFound()
    }
    async function fetchUntilFound() {
        isFetch = false
        let isMore = true;
        while(isMore) {
            for(let i=0; i<comments.length; i++) {
                const comment = comments[i]
                if (comment.commentUUID === commentUUID) {
                    scrollView = true;
                    return;
                }
                if (comment.replyComments) {
                    for(let j=0; j<comment.replyComments.length; j++) {
                        const replyComment = comment.replyComments[j]
                        if (replyComment.commentUUID === commentUUID) {
                            comments[i].replyCursor = j+1
                            scrollView = true;
                            return
                        }
                    }
                }
            }
            isMore = comments.length < totalComments
            offset += limit;
            await fetchData()
        }
    }

    let scrollView = false;
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
        if (totalComments && comments.length >= totalComments) {
            return
        }
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

    $: selfSessionUUID = getSessionUUID()

    if ($socket) {
        $socket.on(SocketEvent.CreateComment, async(data: {sessionUUID: string, commentUUID: string, replyCommentUUID?: string}) => {
            if (data.sessionUUID !== selfSessionUUID) {
                if (((orderBy === Order.DESC || comments.length === totalComments) && !data.replyCommentUUID) || data.replyCommentUUID) {
                    await newComment({commentUUID: data.commentUUID} as any, data.replyCommentUUID)
                }
            }
        })

        $socket.on(SocketEvent.UpdateComment, async(data: {sessionUUID: string, commentUUID: string, replyCommentUUID?: string}) => {
            if (data.sessionUUID !== selfSessionUUID) {
                for(let i=0; i<comments.length; i++) {
                    const comment = comments[i]
                    if ((data.replyCommentUUID && data.replyCommentUUID === comment.commentUUID) || data.commentUUID === comment.commentUUID) {
                        const res = await getComment(forumUUID, data.commentUUID)
                        if (res) {
                            if (data.replyCommentUUID && comment.replyComments) {
                                for(let j=0; j<comment.replyComments.length; j++) {
                                    if (data.commentUUID === comments[i].replyComments![j].commentUUID) {
                                        comments[i].replyComments![j] = {
                                            ...res,
                                            replyComments: comments[i].replyComments,
                                            replyCursor: comments[i].replyCursor,
                                        }
                                        break;
                                    }
                                }
                            } else {
                                comments[i] = {
                                    ...res,
                                    replyComments: comments[i].replyComments,
                                    replyCursor: comments[i].replyCursor,
                                }
                            }
                        }
                        break
                    }
                }
            }
        })

        $socket.on(SocketEvent.DeleteComment, async(data: {sessionUUID: string, commentUUID: string, replyCommentUUID?: string}) => {
            if (data.sessionUUID !== selfSessionUUID) {
                if (data.replyCommentUUID) {
                    for(let i=0; i<comments.length; i++) {
                        const comment = comments[i]
                        if (data.replyCommentUUID === comment.commentUUID) {
                            comments[i].replyComments = comments[i].replyComments?.filter((replyComment, index) => {
                                const isMatch = replyComment.commentUUID === data.commentUUID
                                if (isMatch && comments[i].replyCursor! - 1 >= index) {
                                    comments[i].replyCursor!--;
                                }
                                return !isMatch;
                            });
                            break
                        }
                    }
                } else {
                    comments = comments.filter(comment => comment.commentUUID !== data.commentUUID);
                    totalComments--;
                }
            }
        })
    }
</script>

{#each comments as comment, commentIndex}
    <div class="mt-4">
        <CommentCard
            {authorUUID}
            {forumUUID}
            bind:comment
            bind:scrollView
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
                            bind:scrollView
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