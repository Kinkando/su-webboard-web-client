<script lang="ts">
	import { onMount } from "svelte";
	import { Breadcrumb, BreadcrumbItem, Tabs, TabItem } from "flowbite-svelte";
	import { page } from "$app/stores";
	import OtherUserProfileCard from "@components/user/OtherUserProfileCard.svelte";
	import SelfUserProfileCard from "@components/user/SelfUserProfileCard.svelte";
	import NotFound from "@components/shared/NotFound.svelte";
	import SkeletonOtherUserProfileCard from "@components/skeleton-load/SkeletonOtherUserProfileCard.svelte";
	import SkeletonSelfUserProfileCard from '@components/skeleton-load/SkeletonSelfUserProfileCard.svelte';
    import type { User } from "@models/user";
	import { getUserProfile } from "@services/user";
	import { getUser } from "@util/localstorage";
	import UserList from "@components/user/UserList.svelte";
	import AnnouncementPagination from "@components/partials/AnnouncementPagination.svelte";
	import ForumPagination from "@components/partials/ForumPagination.svelte";

    let user: User;
    let isLoading = true;
    const { userUUID: selfUUID, userType } = getUser()
    $: userUUID = $page.params.userUUID
    onMount(async () => {
        user = await getUserProfile(userUUID)
        isLoading = false
    })

    const defined = (value: any) => value!
</script>

<div class="mb-4">
    <Breadcrumb aria-label="SU Webboard">
        <BreadcrumbItem href="/" home>หน้าแรก</BreadcrumbItem>
        <BreadcrumbItem>โปรไฟล์</BreadcrumbItem>
    </Breadcrumb>
</div>

{#if isLoading}
    {#if selfUUID === userUUID}
        <SkeletonSelfUserProfileCard menuCount={userType === 'std' ? 5 : 4} />
    {:else}
        <SkeletonOtherUserProfileCard />
    {/if}
{:else if user}
    {#if selfUUID === userUUID}
        <SelfUserProfileCard bind:user />
    {:else}
        <OtherUserProfileCard bind:user />
    {/if}

    <div class="m-auto max-w-4xl mt-4 overflow-hidden">
        <Tabs style="underline" defaultClass="flex space-x-2 overflow-x-scroll whitespace-nowrap swipe no-select hide-scrollbar" contentClass="ease-in duration-200 p-4 bg-gray-50 rounded-lg dark:bg-gray-900 mt-4">
            <TabItem open title="กระทู้ที่ตั้ง">
                <ForumPagination userUUID={defined(user.userUUID)} />
            </TabItem>
            {#if user.userType === 'tch'}
                <TabItem title="ประกาศที่สร้าง">
                    <AnnouncementPagination userUUID={defined(user.userUUID)} />
                </TabItem>
            {/if}
            <TabItem title="ผู้ติดตาม {user.followerUserUUIDs?.length || 0}">
                <UserList userUUID={defined(user.userUUID)} type='follower' />
            </TabItem>
            <TabItem title="กำลังติดตาม {user.followingUserUUIDs?.length || 0}">
                <UserList userUUID={defined(user.userUUID)} type='following' />
            </TabItem>
            {#if selfUUID === userUUID}
                <TabItem title="ค้นหาผู้ใช้">
                    <UserList type='search' />
                </TabItem>
            {/if}
        </Tabs>
    </div>
{:else}
    <NotFound />
{/if}