<script lang="ts">
	import { Label } from "flowbite-svelte";
	import type { User } from "@models/user";

    export let user: User;

    const userSchema = [
        {
            label: 'ชื่อผู้ใช้',
            value: '',
        },
        {
            label: 'อีเมล',
            value: '',
        },
    ]

    userSchema[0].value = user.userDisplayName || user.userFullName
    userSchema[1].value = user.userEmail
    if (user.userType === 'std') {
        userSchema.push({
            label: 'รหัสนักศึกษา',
            value: user.studentID || '',
        })
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
</div>