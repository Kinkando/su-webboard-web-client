<script lang="ts">
	import { onMount } from "svelte";
	import { Breadcrumb, BreadcrumbItem, Tabs, TabItem } from "flowbite-svelte";
	import { page } from "$app/stores";
	import AnnouncementPagination from "@components/partials/AnnouncementPagination.svelte";
	import ForumPagination from "@components/partials/ForumPagination.svelte";
	import NotFound from "@components/shared/NotFound.svelte";
	import SkeletonForumList from "@components/skeleton-load/SkeletonForumList.svelte";
	import SkeletonOtherUserProfileCard from "@components/skeleton-load/SkeletonOtherUserProfileCard.svelte";
	import SkeletonSelfUserProfileCard from '@components/skeleton-load/SkeletonSelfUserProfileCard.svelte';
	import SkeletonTabs from "@components/skeleton-load/SkeletonTabs.svelte";
	import OtherUserProfileCard from "@components/user/OtherUserProfileCard.svelte";
	import SelfUserProfileCard from "@components/user/SelfUserProfileCard.svelte";
	import UserList from "@components/user/UserList.svelte";
	import type { User } from "@models/user";
	import { getUserProfile } from "@services/user";
	import { defined } from "@util/generic";
	import { getUser } from "@util/localstorage";

    let user: User;
    let isLoading = true;
    const { userUUID: selfUUID, userType } = getUser()
    $: userUUID = $page.params.userUUID
    onMount(async () => {
        user = await getUserProfile(userUUID)
        isLoading = false
    })
</script>

<div class="mb-4">
    <Breadcrumb aria-label="SU Webboard">
        <BreadcrumbItem href="/" home>หน้าแรก</BreadcrumbItem>
        <BreadcrumbItem>โปรไฟล์</BreadcrumbItem>
    </Breadcrumb>
</div>

{#if isLoading}
    {#if selfUUID === userUUID}
        <SkeletonSelfUserProfileCard menuCount={userType === 'std' ? 4 : 3} />
    {:else}
        <SkeletonOtherUserProfileCard />
    {/if}

    <SkeletonTabs tabCount={selfUUID === userUUID ? 5 : 3}>
        <SkeletonForumList count={10} />
    </SkeletonTabs>
{:else if user}
    {#if selfUUID === userUUID}
        <SelfUserProfileCard bind:user />
    {:else}
        <OtherUserProfileCard bind:user />
    {/if}

    <div class="m-auto max-w-4xl mt-4 overflow-hidden">
        <Tabs style="underline" defaultClass="flex space-x-2 overflow-x-scroll whitespace-nowrap swipe select-none hide-scrollbar" contentClass="ease-in duration-200 p-4 bg-gray-50 rounded-lg dark:bg-gray-900 mt-4">
            <TabItem open title="กระทู้ที่ตั้ง">
                <ForumPagination userUUID={defined(user.userUUID)} query="userUUID" />
            </TabItem>
            {#if selfUUID === userUUID}
                <TabItem title="รายการโปรด">
                    <ForumPagination userUUID={defined(user.userUUID)} query="favoriteUserUUID" />
                </TabItem>
            {/if}
            {#if user.userType === 'tch'}
                <TabItem title="ประกาศที่สร้าง">
                    <AnnouncementPagination userUUID={defined(user.userUUID)} />
                </TabItem>
            {/if}
            <TabItem title="ผู้ติดตาม {user.followerUserUUIDs?.length || 0} คน">
                <UserList userUUID={defined(user.userUUID)} type='follower' />
            </TabItem>
            <TabItem title="กำลังติดตาม {user.followingUserUUIDs?.length || 0} คน">
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