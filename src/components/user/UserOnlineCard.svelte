<script lang="ts">
	import type { User } from "@stores/admin_socket";
	import { timeRange } from "@util/datetime";
	import { onDestroy } from "svelte";

    export let user: User;

    let loginTimeText = timeRange(user.loginAt)
    const period = setInterval(() => loginTimeText = timeRange(user.loginAt), 1000)
    onDestroy(() => clearInterval(period))
</script>

<div class="flex flex-col rounded-md max-w-[8rem] overflow-hidden">
    <img src="{user.userImageURL}" alt="" class="min-w-[4rem] max-w-[4rem] rounded-full m-auto">
    {#if user.userType === 'tch'}
        <div class="flex items-center gap-x-1 m-auto overflow-hidden w-full justify-center">
            <div class="overflow-hidden whitespace-nowrap text-ellipsis text-center">{user.userDisplayName}</div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="blue" class="w-4 h-4">
                <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
            </svg>
        </div>
    {:else}
        <div class="overflow-hidden whitespace-nowrap text-ellipsis text-center">{user.userDisplayName}</div>
    {/if}
    <div class="text-gray-500 text-sm overflow-hidden text-ellipsis w-fit max-w-full whitespace-nowrap m-auto text-center">{user.userFullName}</div>
    <div class="m-auto overflow-hidden text-ellipsis whitespace-nowrap w-full text-center text-blue-600 dark:text-blue-500 text-sm">{loginTimeText}</div>
</div>