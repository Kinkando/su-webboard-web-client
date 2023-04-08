<script lang="ts">
    import { Breadcrumb, BreadcrumbItem, Button, Popover } from "flowbite-svelte";
    import { onMount } from "svelte";
	import { slide } from "svelte/transition";
    import { inview } from "svelte-inview";
	import { goto } from "$app/navigation";
    import NotificationCard from "@components/notification/NotificationCard.svelte";
	import SkeletonNotificationCard from "@components/skeleton-load/SkeletonNotificationCard.svelte";
	import type { NotificationItem } from '@models/notification';
	import { getNotiList, readAllNoti } from "@services/notification";
	import notificationSocket from '@stores/notification_socket';
	import { getUserUUID } from "@util/localstorage";
    import notificationStore from "@stores/notification"

    let limit = 10;
    let total = 0;
    let isLoading = true;
    let activeTab: 'all' | 'unread' | 'read' = 'all';
    let notifications: NotificationItem[] = [];
    let element: HTMLDivElement;
    let hasMore = true;

    let tabs: {name: string, value: 'all' | 'unread' | 'read'}[] = [
        {
            name: 'ทั้งหมด',
            value: 'all',
        },
        {
            name: 'ยังไม่ได้อ่าน',
            value: 'unread',
        },
        {
            name: 'อ่านแล้ว',
            value: 'read',
        },
    ]

    let unreadNotiCount = 0;
    notificationStore.subscribe(async(notiStore) => {
        const fetchTotal = notiStore?.unreadNotiCount > unreadNotiCount ? notifications?.length + 10 : (notifications?.length || 0)
        const res = await getNotiList(Math.max(fetchTotal, 10), 0, activeTab)
        total = res?.total || 0
        notifications = res?.data || []
        unreadNotiCount = notiStore?.unreadNotiCount || 0
    })

    const markAsReadAll = async () => {
        element.click(); // close ellipsis notification
        await readAllNoti()
        if (activeTab === 'unread') {
            notifications = []
            total = 0
        } else {
            notifications = notifications.map(noti => {
                noti.isRead = true
                return noti
            })
        }
        $notificationSocket.emit('read', { userUUID: getUserUUID() })
    }

    const fetchData = async() => {
        const res = await getNotiList(limit, notifications.length, activeTab)
        total = res?.total || 0

        const temp: NotificationItem[] = []
        const notiUUIDs = notifications.map(noti => noti.notiUUID)
        res.data?.forEach(noti => {
            if (!notiUUIDs.includes(noti.notiUUID)) {
                temp.push(noti)
            }
        })
        return temp ? [...notifications, ...temp] : [...notifications]
    }

    onMount(async() => {
        isLoading = true;
        notifications = await fetchData()
        isLoading = false;
    })

    const changeTab = async (tab: 'all' | 'unread' | 'read') => {
        activeTab = tab;
        total = 0;
        notifications = [];
        isLoading = true;
        hasMore = true;
        notifications = await fetchData()
        isLoading = false;
    }

    function load(e: CustomEvent<ObserverEventDetails>) {
        hasMore = notifications.length < total
        if (e.detail.inView && hasMore) {
            (async() => notifications = await fetchData())()
        }
    }

    const deleteNoti = (notiUUID: string) => notifications = notifications.filter(noti => noti.notiUUID !== notiUUID)
</script>

<div class="mb-4">
    <Breadcrumb aria-label="SU Webboard">
        <BreadcrumbItem href="/" home>หน้าแรก</BreadcrumbItem>
        <BreadcrumbItem>การแจ้งเตือน</BreadcrumbItem>
    </Breadcrumb>
</div>

<Popover class="select-none text-sm w-fit transition-colors ease-in duration-200 py-2 shadow-none" defaultClass="p-0 w-fit" transition={slide} params={{duration: 200}} placement="bottom" trigger="click" triggeredBy="#notification-menu">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <li class="cursor-pointer flex items-center gap-x-2 px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700" on:click={markAsReadAll}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
        </svg>
        <div>ทำเครื่องหมายทั้งหมดว่าอ่านแล้ว</div>
    </li>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <li class="cursor-pointer flex items-center gap-x-2 px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700" on:click={() => goto('/setting')}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path fill-rule="evenodd" d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
        </svg>
        <div>ตั้งค่าการแจ้งเตือน</div>
    </li>
</Popover>

<!-- ทำเครื่องหมายว่าอ่านแล้ว, ลบการแจ้งเตือนนี้ออก -->
<div class="ease-in duration-200 bg-white dark:bg-gray-900 w-full rounded-md shadow-lg p-4 sm:p-6 max-w-4xl m-auto">
    <div class="flex items-center justify-between p-2">
        <h4 class="text-black dark:text-gray-200 text-2xl">การแจ้งเตือน</h4>
        <div bind:this={element} class="rounded-full p-1 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-800 text-black dark:text-white ease-in duration-150 transition-colors" id="notification-menu">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
            </svg>
        </div>
    </div>

    <hr class="border-gray-300 dark:border-gray-600 mb-2">

    <div class="flex items-center mb-2 flex-wrap gap-2">
        {#each tabs as tab}
            <Button color="{activeTab === tab.value ? 'blue' : 'primary'}" size="sm" class="rounded-3xl {activeTab === tab.value ? '' : '!text-black dark:!text-white hover:!bg-gray-300 dark:hover:!bg-gray-700'} ease-in duration-200 transition-colors" on:click={() => changeTab(tab.value)}>{tab.name}</Button>
        {/each}
    </div>

    {#if isLoading}
        {#each Array(limit) as _}
            <div class="my-2">
                <SkeletonNotificationCard />
            </div>
        {/each}
    {:else if notifications.length}
        {#each notifications as notification, index}
            <div class="rounded-md overflow-hidden my-2">
                <NotificationCard bind:notification on:delete={(event) => deleteNoti(event.detail)} ellipsisPlacement={index === notifications.length - 1 ? 'top' : 'bottom'} ellipsis />
            </div>
        {/each}

        {#if hasMore}
            {#each Array(1) as _}
                <div class="my-2">
                    <SkeletonNotificationCard />
                </div>
            {/each}
        {/if}

    {:else}
        <div class="flex justify-center py-8">
            <img src="/images/no-notification.png" alt="" class="w-16 h-16">
        </div>
        <div class="px-2 mb-6 text-center text-black dark:text-white">ยังไม่มีการแจ้งเตือนในขณะนี้</div>
    {/if}
</div>

<div use:inview={{}} on:change={load} />