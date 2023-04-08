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
        <img src="{user.userImageURL}" alt="" class="z-0 min-w-[4rem] max-w-[4rem] min-h-[4rem] max-h-[4rem] rounded-full hover:scale-110 ease-in duration-200">
    </a>
    <div class="w-fit overflow-hidden">
        <a href="/profile/{user.userUUID}" class="overflow-hidden">
            <div class="flex items-center gap-x-1 text-black dark:text-white overflow-hidden text-ellipsis w-fit max-w-full whitespace-nowrap hover:underline">
                <span>{user.userDisplayName}</span>
                {#if user.userType === 'tch'}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="blue" class="w-4 h-4">
                        <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                    </svg>
                {/if}
            </div>
        </a>
        <a href="/profile/{user.userUUID}" class="overflow-hidden">
            <div class="text-gray-500 text-sm overflow-hidden text-ellipsis w-fit max-w-full cursor-pointer whitespace-nowrap hover:underline">{user.userFullName}</div>
        </a>
    </div>
    {#if !user.isSelf && user.isFollowing !== undefined}
        <div class="ml-auto">
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
        </div>
    {/if}
</div>