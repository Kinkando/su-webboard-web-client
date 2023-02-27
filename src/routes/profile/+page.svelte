<script lang="ts">
	import userStore from '@stores/user';
	import SkeletonUpdateProfile from '@components/skeleton-load/SkeletonUpdateProfile.svelte';
	import { onMount } from "svelte";
	import { Breadcrumb, BreadcrumbItem, Button, Input, Label, Radio } from "flowbite-svelte";
	import ToggleBadge from "@components/badge/ToggleBadge.svelte";
    import type { User } from "@models/user";
	import { getUserProfile } from "@services/user";

    enum StatusGroup {
        anonymous = "anonymous",
        nominate = "nominate",
    }

    let isUpdate = false;
    let user: User;
    let draft: any;
    let statusGroup: string;

    let files: FileList;
    let fileInput: HTMLInputElement;
    $: files && updateProfileImage()
    const updateProfileImage = () => {
        if (files?.length) {
            draft.userImageURL = URL.createObjectURL(files[0])
        }
    }

    onMount(async () => {
        user = await getUserProfile()
        draft = {...user}
        statusGroup = user.isAnnonymous ? StatusGroup.anonymous : StatusGroup.nominate
    })

    const updateProfile = async () => {
        user.userDisplayName = draft.userDisplayName
        user.isAnnonymous = statusGroup === StatusGroup.anonymous
        user.userImageURL = draft.userImageURL;
        userStore.set(user)
        isUpdate = false
    }

    $: if(!isUpdate) {
        draft = {...user}
        statusGroup = user?.isAnnonymous ? StatusGroup.anonymous : StatusGroup.nominate
    }

    const inputs = [
        {
            label: "ชื่อที่ใช้แสดง",
            placeholder: "กรุณาใส่ชื่อที่ใช้แสดง",
            key: "userDisplayName",
        },
        {
            label: "ชื่อ-นามสกุล",
            placeholder: "",
            key: "userFullName",
        },
        {
            label: "อีเมล",
            placeholder: "",
            key: "userEmail",
        },
        {
            label: "รหัสนักศึกษา",
            placeholder: "",
            key: "studentID",
        },
    ]
</script>

<div class="mb-4">
    <Breadcrumb aria-label="SU Webboard">
        <BreadcrumbItem href="/" home>หน้าแรก</BreadcrumbItem>
        <BreadcrumbItem>โปรไฟล์</BreadcrumbItem>
    </Breadcrumb>
</div>
{#if !user}
    <SkeletonUpdateProfile />
{:else}
    <div class="ease-in duration-200 bg-white dark:bg-gray-900 w-full rounded-md shadow-lg p-4 sm:p-6 max-w-4xl m-auto">
        <div class="md:flex md:items-start md:gap-x-6">
            <figure class="w-fit h-fit cursor-pointer m-auto relative">
                <img
                    alt=""
                    class="rounded-full min-w-[225px] min-h-[225px] max-w-[225px] max-h-[225px]"
                    src="{isUpdate ? draft?.userImageURL : user?.userImageURL}"
                />

                {#if isUpdate}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div class="absolute bottom-4 right-4 rounded-full p-2 bg-[var(--primary-color)] text-white border-2 dark:border-gray-900 ease-in duration-200 cursor-pointer" on:click={() => fileInput.click()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                        <input bind:this={fileInput} type="file" accept="image/*" hidden bind:files>
                    </div>
                {/if}
            </figure>

            <div class="space-y-4 w-full md:mt-0 my-6">
                {#key isUpdate}
                    {#each inputs as input}
                        <Label for={input?.label} class="space-y-2 text-black dark:text-white">
                            <span>{input?.label}</span>
                            {#if isUpdate && input?.placeholder}
                                <Input type="text" id="title" class="ease-in duration-200 placeholder-gray-300" placeholder={input?.placeholder} required bind:value={draft[input?.key]} />
                            {:else}
                                <div class="py-2.5 border text-gray-400 dark:text-gray-600 border border-transparent break-words">{draft[input?.key]}</div>
                            {/if}
                        </Label>
                    {/each}

                    <Label for="isAnonymous" class="space-y-2">
                        <span>สถานะ</span>
                        {#if isUpdate}
                            <div class="flex gap-x-2.5">
                                <Radio bind:group={statusGroup} value={StatusGroup.nominate} custom class="w-fit my-1.5">
                                    <ToggleBadge hexColor="primary" name="เปิดเผยตัวตน" isActive={statusGroup === StatusGroup.nominate} />
                                </Radio>
                                <Radio bind:group={statusGroup} value={StatusGroup.anonymous} custom class="w-fit my-1.5">
                                    <ToggleBadge hexColor="primary" name="ปกปิดตัวตน" isActive={statusGroup === StatusGroup.anonymous} />
                                </Radio>
                            </div>
                        {:else}
                            <div class="py-2.5 text-gray-400 dark:text-gray-600">
                                {user?.isAnnonymous ? 'ปกปิดตัวตน' : 'เปิดเผยตัวตน'}
                            </div>
                        {/if}
                    </Label>
                {/key}
            </div>
            {#if !isUpdate}
                <Button color="cyanToBlue" gradient class="md:w-fit w-full whitespace-nowrap" type="button" on:click={() => isUpdate = true}>Update Profile</Button>
            {:else}
                <div class="flex gap-x-4">
                    <Button color="red" gradient class="md:w-fit w-full whitespace-nowrap" type="reset" on:click={() => isUpdate = false}>Cancel</Button>
                    <Button color="green" gradient class="md:w-fit w-full whitespace-nowrap" type="submit" on:click={updateProfile}>Confirm</Button>
                </div>
            {/if}
        </div>
    </div>
{/if}