<script lang="ts">
	import { Indicator } from "flowbite-svelte";
	import type { Notification } from "@models/notification";
	import NotificationCard from "./NotificationCard.svelte";

    export let notification: Notification;
</script>

<header class="fixed z-30 h-10 w-full bg-white dark:bg-gray-900 shadow-sm text-center text-lg flex items-center justify-center gap-x-1 rounded-t-md py-1">
    <span>การแจ้งเตือน</span>
    {#if notification?.unreadNotiCount}
        <Indicator color="red" size="lg">
            <span class="text-white text-xs">{notification?.unreadNotiCount}</span>
        </Indicator>
    {/if}
</header>

<div class="h-10 w-full" />
<section class="relative min-w-[330px] max-w-sm">
    {#if notification && notification.notiList?.length}
         {#each notification.notiList.slice(0, Math.min(3, notification.notiList.length)) as _, index}
             <hr class="border-gray-300 dark:border-gray-600">
             <NotificationCard bind:notification={notification.notiList[index]} />
        {/each}
    {:else}
        <hr class="border-gray-300 dark:border-gray-600">
        <div class="flex justify-center py-8">
            <img src="/images/no-notification.png" alt="" class="w-16 h-16">
        </div>
        <div class="px-2 mb-6 text-center">ยังไม่มีการแจ้งเตือนในขณะนี้</div>
    {/if}
    <a class="flex items-center py-2 justify-center ease-in duration-150 transition-colors bg-gray-50 dark:bg-gray-900 hover:bg-gray-300 dark:hover:bg-gray-600" href="/notification">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <div class="ml-2">ดูทั้งหมด</div>
    </a>
</section>