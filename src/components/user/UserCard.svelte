<script lang="ts">
	import type { User } from "@models/user";
	import { followingUser } from "@services/user";
	import { Button } from "flowbite-svelte";

    export let user: User

    const following = () => {
        user.isFollowing = !user.isFollowing
        followingUser(user.userUUID!, user.isFollowing)
    }
</script>

<div class="flex items-center p-4 w-full gap-x-2 sm:gap-x-4">
    <a href="/profile/{user.userUUID}">
        <img src="{user.userImageURL}" alt="" class="z-0 min-w-[4rem] max-w-[4rem] min-h-[4rem] max-h-[4rem] rounded-full">
    </a>
    <div class="w-full overflow-hidden">
        <div class="text-black dark:text-white overflow-hidden text-ellipsis whitespace-nowrap">{user.userDisplayName}</div>
        <div class="text-gray-500 text-sm overflow-hidden text-ellipsis whitespace-nowrap">{user.userFullName}</div>
    </div>
    {#if !user.isSelf && user.isFollowing !== undefined}
        <Button
            color={user.isFollowing ? 'purpleToBlue' : 'pinkToOrange'}
            gradient
            class="whitespace-nowrap"
            type="button"
            size="sm"
            on:click={following}
        >
            {user.isFollowing ? 'กำลังติดตาม' : 'ติดตาม'}
        </Button>
    {/if}
</div>