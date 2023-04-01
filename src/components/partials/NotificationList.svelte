<script lang="ts">
	import { Indicator } from "flowbite-svelte";
	import type { Notification, NotificationItem } from "@models/notification";
	import { timeRange } from "@util/datetime";
	import { goto } from "$app/navigation";
	import { readNoti } from "@services/notification";

    export let notification: Notification;

    const gotoLink = async (noti: NotificationItem) => {
        if (!noti.isRead) {
            readNoti(noti.notiUUID)
            noti.isRead = true;
            if (notification.unreadNotiCount) {
                notification.unreadNotiCount--;
            }
        }
        await goto(noti.notiLink)
    }
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
    {#each notification?.notiList as noti}
        <hr class="border-gray-300 dark:border-gray-600">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="flex items-start gap-x-3 py-2 overflow-x-hidden px-3 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-500 relative {!noti?.isRead ? 'bg-gray-200 dark:bg-gray-700' : ''}" on:click={() => gotoLink(noti)}>
            <img src={noti.notiUserImageURL} alt="" class="w-10 rounded-full">
            {#if !noti?.isRead}
                <Indicator color="red" size="md" border class="absolute left-11 top-2"></Indicator>
            {/if}

            <div class="overflow-hidden">
                <div class="text-lg text-ellipsis overflow-hidden whitespace-nowrap">{noti.notiUserDisplayName}</div>
                <div class="text-gray-400 text-ellipsis overflow-hidden whitespace-nowrap">{noti.notiBody}</div>
                <div class="font-light text-gray-400 text-ellipsis overflow-hidden whitespace-nowrap">{timeRange(noti.notiAt)}</div>
            </div>
        </div>
    {:else}
        <hr class="border-gray-300 dark:border-gray-600">
        <div class="flex justify-center py-8">
            <img src="/images/no-notification.png" alt="" class="w-16 h-16">
        </div>
        <div class="px-2 mb-6 text-center">ยังไม่มีการแจ้งเตือนในขณะนี้</div>
    {/each}
</section>