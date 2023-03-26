<script lang="ts">
	import { onMount } from "svelte";
	import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";
	import SkeletonUserProfileCard from '@components/skeleton-load/SkeletonUserProfileCard.svelte';
    import type { User } from "@models/user";
	import { getUserProfile } from "@services/user";
	import { page } from "$app/stores";
	import { getUser } from "@util/localstorage";
	import UserProfileCard from "@components/partials/UserProfileCard.svelte";
	import NotFound from "@components/shared/NotFound.svelte";
	import UserCard from "@components/partials/UserCard.svelte";
	import SkeletonUserCard from "@components/skeleton-load/SkeletonUserCard.svelte";

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
        <SkeletonUserProfileCard menuCount={userType === 'std' ? 5 : 4} />
    {:else}
        <SkeletonUserCard />
    {/if}
{:else if user}
    {#if selfUUID === userUUID}
        <UserProfileCard bind:user />
    {:else}
        <UserCard bind:user />
    {/if}
{:else}
    <NotFound />
{/if}