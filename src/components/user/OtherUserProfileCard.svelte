<script lang="ts">
	import { Button, Chevron, Dropdown, DropdownItem, Label } from "flowbite-svelte";
	import type { User } from "@models/user";
	import { followingUser, notificationUser } from "@services/user";

    export let user: User;

    const userSchema = [
        {
            label: 'ชื่อที่ใช้แสดง',
            value: user.userDisplayName,
        },
        {
            label: 'ชื่อ-นามสกุล',
            value: user.userFullName,
        },
        {
            label: 'อีเมล',
            value: user.userEmail,
        },
    ]

    if (user.userType === 'std') {
        userSchema.push({
            label: 'รหัสนักศึกษา',
            value: user.studentID || '',
        })
    }

    const following = () => {
        user.isFollowing = !user.isFollowing
        user.isNoti = user.isFollowing
        followingUser(user.userUUID!, user.isFollowing)
    }

    const notification = () => {
        user.isNoti = !user.isNoti
        notificationUser(user.userUUID!, user.isNoti)
    }
</script>

<div class="ease-in duration-200 bg-white dark:bg-gray-900 w-full rounded-md shadow-lg p-4 sm:p-6 max-w-4xl m-auto">
    <div class="md:flex md:items-start md:gap-x-6">
        <figure class="w-fit h-fit cursor-pointer m-auto relative">
            <img
                alt=""
                class="rounded-full min-w-[225px] min-h-[225px] max-w-[225px] max-h-[225px]"
                src="{user?.userImageURL}"
            />
        </figure>

        <div class="space-y-4 w-full md:mt-0 my-6">
            {#each userSchema as schema}
                <Label for={schema.label} class="space-y-2 text-black dark:text-white">
                    <span>{schema.label}</span>
                    <div class="py-2.5 text-gray-400 dark:text-gray-600 border border-transparent break-all">{schema.value}</div>
                </Label>
            {/each}
        </div>
    </div>

    <div class="flex justify-end">
        {#if user.isFollowing}
            <Button color="blue" gradient class="md:w-fit whitespace-nowrap"><Chevron><div class="whitespace-nowrap">กำลังติดตาม</div></Chevron></Button>
            <Dropdown class="w-32">
                <DropdownItem on:click={notification}>{ user.isNoti ? 'ปิดการแจ้งเตือน' : 'เปิดการแจ้งเตือน' }</DropdownItem>
                <DropdownItem on:click={following}>เลิกติดตาม</DropdownItem>
            </Dropdown>
        {:else}
            <Button color="pinkToOrange" gradient class="md:w-fit whitespace-nowrap" type="button" on:click={following}>ติดตาม</Button>
        {/if}
    </div>
</div>