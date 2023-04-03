<script lang="ts">
	import notificationStore from '@stores/notification';
	import { Indicator } from "flowbite-svelte";
	import { goto } from '$app/navigation';
	import type { NotificationItem } from "@models/notification";
	import { readNoti } from '@services/notification';
	import { timeRange } from "@util/datetime";
	import { createEventDispatcher, onDestroy } from "svelte";

    export let notification: NotificationItem;

    let notiAt = ""
    const period = setInterval(() => notiAt = timeRange(notification.notiAt), 1000)
    onDestroy(() => clearInterval(period))

    const dispatch = createEventDispatcher()
    const gotoLink = async (noti: NotificationItem) => {
        if (!noti.isRead) {
            readNoti(noti.notiUUID)
            noti.isRead = true;
            notificationStore.update(all => {
                if (all.unreadNotiCount) {
                    all.unreadNotiCount--;
                }
                return all
            })
        }
        dispatch('read')
        await goto(noti.notiLink)
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="flex items-start gap-x-3 py-2 overflow-x-hidden px-3 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-500 relative {!notification?.isRead ? 'bg-gray-200 dark:bg-gray-700' : ''}" on:click={() => gotoLink(notification)}>
    <img src={notification.notiUserImageURL} alt="" class="rounded-full min-w-[3rem] max-w-[3rem] min-h-[3rem] max-h-[3rem]">
    {#if !notification?.isRead}
        <Indicator color="red" size="md" border class="absolute left-11 top-2"></Indicator>
    {/if}

    <div class="overflow-hidden">
        <div class="text-base text-ellipsis overflow-hidden whitespace-nowrap">{notification.notiUserDisplayName}</div>
        <div class="text-gray-400 text-ellipsis overflow-hidden line-clamp-2 text-sm">{notification.notiBody}</div>
        <div class="font-medium text-blue-500 text-ellipsis overflow-hidden whitespace-nowrap">{notiAt || timeRange(notification.notiAt)}</div>
    </div>
</div>