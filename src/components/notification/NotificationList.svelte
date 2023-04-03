<script lang="ts">
	import { Indicator } from "flowbite-svelte";
	import type { Notification } from "@models/notification";
	import NotificationPopup from "./NotificationPopup.svelte";

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
<section class="relative min-w-[330px] max-w-sm max-h-64">
    {#each notification?.notiList as _, index}
        <hr class="border-gray-300 dark:border-gray-600">
        <NotificationPopup bind:notification={notification.notiList[index]} />
    {:else}
        <hr class="border-gray-300 dark:border-gray-600">
        <div class="flex justify-center py-8">
            <img src="/images/no-notification.png" alt="" class="w-16 h-16">
        </div>
        <div class="px-2 mb-6 text-center">ยังไม่มีการแจ้งเตือนในขณะนี้</div>
    {/each}
</section>