<script lang="ts">
	import PostDescription from './PostDescription.svelte';
	import { Button, Input, Label, Radio, Spinner, Textarea } from 'flowbite-svelte';
	import ToggleBadge from '@components/badge/ToggleBadge.svelte';
	import type { Category } from '@models/category';
	import type { Attachment, FormSchema } from '@models/new-post';
	import type { User } from '@models/user';

    export let title: FormSchema;
    export let description: FormSchema;
    export let categories: Category[] | undefined = undefined;
    export let attachments: Attachment[];
    export let submitName: string = "ยืนยัน";
    export let cancel: () => void;
    export let submit: () => void = async() => {};
    export let deleteImageUUIDs: string[] = [];
    export let user: User | undefined = undefined;
    export let anonymousePost = false;
    export let isAnonymous = false;

    let fileInput: HTMLInputElement;
    let files: FileList;

    $: files && addImage(...files)
    const addImage = (...files: File[]) => {
        attachments = attachments.concat(...files.map(file => {
            const attachment: Attachment = {
                src: URL.createObjectURL(file),
                isLoading: true,
                file,
            }
            return attachment
        }))
    }
    const removeImage = (index: number) => {
        if (attachments[index].uuid) {
            deleteImageUUIDs.push(attachments[index].uuid!)
        }
        attachments = attachments.filter((_, idx) => index !== idx)
    }

    const postModes = [
        {
            name: 'เปิดเผยตัวตน',
            value: 'display',
            mod: '',
        },
        {
            name: 'ปกปิดตัวตน',
            value: 'anonymous',
            mod: 'ผู้ใช้นิรนาม',
        },
    ]
    let postMode = postModes[0].value;
    function setDefaultPostMode() {
        postModes[0].mod += user?.userDisplayName
        if (user?.isAnonymous) {
            postMode = postModes[1].value
        }
    }
    $: user && setDefaultPostMode()
    $: if(postMode) {
        isAnonymous = postMode === postModes[1].value
    }
</script>

<Label for="title" class="space-y-2 text-black dark:text-white">
    <span>{title.label}</span>
    <Input type="text" id="title" class="ease-in duration-200 placeholder-gray-300" placeholder={title.placeholder} required bind:value={title.value} />
</Label>

<Label for="description" class="space-y-2 mt-4 text-black dark:text-white">
    <span>{description.label}</span>
    <!-- <PostDescription bind:text={description.value} /> -->
    <Textarea id="description" class="ease-in duration-200 transition-colors placeholder-gray-300 min-h-[300px] !bg-gray-50 dark:!bg-gray-700" placeholder={description.placeholder} required bind:value={description.value} />
</Label>

{#if categories}
    <Label for="category" class="space-y-2 mt-4">
        <span>หมวดหมู่</span>
        <div id="category" class="ease-in duration-200 w-full p-2.5 border dark:border-gray-500 text-sm rounded-lg bg-gray-50 dark:bg-gray-700 overflow-x-hidden flex flex-wrap">
            {#if categories?.length}
                {#each categories as category, index}
                    <div class="m-1.5">
                        <ToggleBadge toggle hexColor={category.categoryHexColor} name={category.categoryName} bind:isActive={category.isActive} />
                    </div>
                {/each}
            {:else}
                {#each Array(5) as _}
                    <!-- Skeleton Load CategoryBadgeToggle -->
                    <div class="animate-pulse ease-in duration-480">
                        <div class="w-20 h-8 rounded-md bg-gray-300 dark:bg-gray-800 m-1" />
                    </div>
                {/each}
            {/if}
        </div>
    </Label>
{/if}

<Label for="attachment" class="mt-4 flex items-center">
    <div>รูปภาพ</div>
    <input bind:this={fileInput} type="file" accept="image/*" multiple hidden bind:files>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="ml-2 rounded-full bg-[var(--primary-color)] text-white p-1 cursor-pointer hover:scale-110 ease-in duration-200" on:click={() => fileInput.click()}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
    </div>
</Label>

<div class="my-4 grid gap-2 sm:gap-4 no-select" style="grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))">
    {#each attachments as attachment, index}
        <div class="relative overflow-hidden rounded-md  aspect-square">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="cursor-pointer rounded-full p-1 z-10 absolute top-1 right-1 bg-[#e15e3f] w-fit h-fit" on:click={() => removeImage(index)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-white">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </div>
            {#if attachment.isLoading}
                <figure class="w-full h-full animate-pulse ease-in duration-200 absolute z-0 bg-gray-400 flex items-center justify-center">
                    <Spinner size="10" />
                </figure>
            {/if}
            <img
                src="{attachment.src}"
                alt="{attachment.file.name}"
                class="w-full h-full hover:scale-105 ease-in duration-200 hover:brightness-75 "
                on:load={() => attachment.isLoading = false}
            >
        </div>
    {/each}
</div>

{#if anonymousePost}
    <Label for="isAnonymous">
        <div>การแสดงชื่อผู้สร้างกระทู้</div>
        {#each postModes as mode}
            <Radio bind:group={postMode} value={mode.value} class="w-fit my-1.5">{mode.name}&nbsp;<span class="text-blue-400 font-bold">({mode.mod || '...'})</span></Radio>
        {/each}
    </Label>
{/if}

<div class="flex items-center justify-end gap-x-2 mt-4">
    <Button color="dark" size="sm" type="reset" on:click={cancel}>ยกเลิก</Button>
    <Button color="green" size="sm" type="submit" disabled={!title?.value || !description?.value || (categories && categories.length && !categories.filter(category => category.isActive)?.length)} on:click={submit}>{submitName}</Button>
</div>