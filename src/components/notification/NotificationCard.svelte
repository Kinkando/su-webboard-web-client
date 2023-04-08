<script lang="ts">
    import { Indicator, Popover } from "flowbite-svelte";
	import { createEventDispatcher, onDestroy } from "svelte";
    import { slide } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import type { NotificationItem } from "@models/notification";
	import { deleteNoti, readNoti } from '@services/notification';
	import notificationSocket from '@stores/notification_socket';
	import { timeRange } from "@util/datetime";
	import { getUserUUID } from "@util/localstorage";
	import { alert } from "@stores/alert";

    export let ellipsis = false;
    export let notification: NotificationItem;
    export let ellipsisPlacement: 'bottom' | 'top' = "bottom"

    let notiAt = ""
    const period = setInterval(() => notiAt = timeRange(notification.notiAt), 1000)
    onDestroy(() => clearInterval(period))

    const dispatch = createEventDispatcher()
    const gotoLink = async (event: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }) => {
        if (ellipsis) {
            const elm = event.target as HTMLElement
            if ([elm.parentElement, elm].includes(ellipsisButton)) {
                event.preventDefault();
                return;
            }
            if ([elm.parentElement, elm].includes(ellipsisButton.children.item(0) as any)) {
                event.preventDefault();
                return;
            }
        }
        await markAsRead()
        await goto(notification.notiLink)
    }

    const markAsRead = async(isClose = false) => {
        if (ellipsis && isClose) {
            ellipsisButton.click()
        }
        if (!notification.isRead) {
            await readNoti(notification.notiUUID)
            notification.isRead = true;
            $notificationSocket.emit('read', { userUUID: getUserUUID(), notiUUID: notification.notiUUID })
            dispatch('read')
        }
    }

    const removeNotification = async() => {
        if (ellipsis) {
            ellipsisButton.click()
            await deleteNoti(notification.notiUUID)
            // $notificationSocket.emit('refresh', getUserUUID())
            dispatch('delete', notification.notiUUID)
            alert({type: 'success', message: 'ลบการแจ้งเตือนออกแล้ว'})
        }
    }

    let ellipsisButton: HTMLDivElement;
    let cardElement: HTMLDivElement;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div bind:this={cardElement} class="ease-in duration-150 transition-colors flex items-start gap-x-3 py-2 overflow-x-hidden px-3 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-500 relative {!notification?.isRead ? 'bg-gray-200 dark:bg-gray-700' : ''}" on:click={gotoLink}>
    <img src={notification.notiUserImageURL} alt="" class="rounded-full min-w-[3rem] max-w-[3rem] min-h-[3rem] max-h-[3rem]">
    {#if !notification?.isRead}
        <Indicator color="red" size="md" border class="absolute left-11 top-2"></Indicator>
    {/if}

    <div class="{ellipsis ? '' : 'overflow-hidden'}">
        <div class="text-base text-black dark:text-white {ellipsis ? 'mr-7' : 'text-ellipsis overflow-hidden whitespace-nowrap'}">{notification.notiUserDisplayName}</div>
        <div class="text-gray-400 text-sm {ellipsis ? '' : 'text-ellipsis overflow-hidden line-clamp-2'}">{notification.notiBody}</div>
        <div class="font-medium text-sm text-blue-500 {ellipsis ? '' : 'text-ellipsis overflow-hidden whitespace-nowrap'}">{notiAt || timeRange(notification.notiAt)}</div>
    </div>

    {#if ellipsis}
        <div class="absolute top-1 right-1">
            <div bind:this={ellipsisButton} class="rounded-full p-1 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-800 text-black dark:text-white ease-in duration-150 transition-colors" id="notification-menu-{notification.notiUUID}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                    <path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                </svg>
            </div>
        </div>
    {/if}
</div>

{#if ellipsis}
    <Popover class="select-none text-sm w-fit transition-colors ease-in duration-200 py-2 shadow-none" defaultClass="p-0 w-fit" transition={slide} params={{duration: 200}} placement={ellipsisPlacement} trigger="click" triggeredBy="#notification-menu-{notification.notiUUID}">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li id="notification-item-1" class="cursor-pointer flex items-center gap-x-2 px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700" on:click={() => markAsRead(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
            </svg>
            <div>ทำเครื่องหมายว่าอ่านแล้ว</div>
        </li>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li id="notification-item-1" class="cursor-pointer flex items-center gap-x-2 px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700" on:click={removeNotification}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
            <div>ลบการแจ้งเตือน</div>
        </li>
    </Popover>
{/if}