<script lang="ts">
    import { onMount } from 'svelte';
	import { Button, Input, Label, Spinner, Textarea } from 'flowbite-svelte';
	import type { Category } from '@models/category';
	import { getAllCategories } from '@services/category';
	import CategoryBadgeToggle from '@components/shared/CategoryBadgeToggle.svelte';

    interface CategoryToggle {
        categoryUUID: string
        isActive: boolean
    }

    interface Attachment {
        src: string
        file: File
        isLoading: boolean
    }

    let title = "";
    let description = "";
    let categoryToggles: CategoryToggle[] = [];

    let fileInput: HTMLInputElement;
    let files: FileList;
    let attachments: Attachment[] = [];

    $: files && addImage(...files)
    const addImage = (...files: File[]) => {
        const tempAttachments: Attachment[] = [];
        files.forEach(file => tempAttachments.push({
            src: URL.createObjectURL(file),
            isLoading: true,
            file,
        }))
        attachments = attachments.concat(...tempAttachments)
    }
    const removeImage = (index: number) => {
        attachments = attachments.filter((_, idx) => index !== idx)
    }

    let categories: Category[] = [];
    onMount(async () => {
        categories = await getAllCategories()
        categories.forEach(category => categoryToggles.push({categoryUUID: category.categoryUUID, isActive: false}))
    })
</script>

<div class="bg-white w-full rounded-md shadow-lg p-4 sm:p-6">
    <Label for="title" class="space-y-2">
        <span>Title</span>
        <Input type="text" id="title" class="placeholder-gray-300" placeholder="Enter a title ..." required bind:value={title} />
    </Label>

    <Label for="description" class="space-y-2 mt-4">
        <span>Description</span>
        <Textarea id="description" class="placeholder-gray-300 min-h-[150px]" placeholder="Enter a description ..." required bind:value={description} />
    </Label>

    <Label for="category" class="space-y-2 mt-4">
        <span>Categories</span>
        <div id="category" class="w-full p-2.5 border text-sm rounded-lg bg-gray-50 text-gray-900 overflow-x-hidden flex flex-wrap">
            {#if categories.length}
                {#each categories as category, index}
                    <CategoryBadgeToggle {category} bind:isActive={categoryToggles[index].isActive} />
                {/each}
            {:else}
                {#each Array(5) as _}
                    <!-- Skeleton Load CategoryBadgeToggle -->
                    <div class="animate-pulse ease-in duration-480">
                        <div class="w-20 h-8 bg-gray-300 rounded-md dark:bg-gray-700 m-1"></div>
                    </div>
                {/each}
            {/if}
        </div>
    </Label>

    <Label for="attachment" class="space-y-2 mt-4">
        <div>Attachments</div>
        <input bind:this={fileInput} type="file" accept="image/*" multiple hidden bind:files>
        <Button gradient color="green" size="sm" type="button" on:click={() => fileInput.click()}>Add Pictures</Button>
    </Label>

    <div class="my-4 grid gap-2 no-select" style="grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))">
        {#each attachments as attachment, index}
            <div class="relative overflow-hidden rounded-md">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="cursor-pointer rounded-full p-1 z-10 absolute top-1 right-1 bg-[#e15e3f] w-fit h-fit" on:click={() => removeImage(index)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-white">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </div>
                {#if attachments[index].isLoading}
                    <figure class="w-full h-48 animate-pulse ease-in duration-200 absolute z-0 bg-gray-400 flex items-center justify-center">
                        <Spinner size="10" />
                    </figure>
                {/if}
                <img
                    src="{attachment.src}"
                    alt="{attachment.file.name}"
                    class="w-full h-48 hover:scale-105 ease-in duration-200 hover:brightness-75"
                    on:load={() => attachment.isLoading = false}
                >
            </div>
        {/each}
    </div>

    <div class="flex items-center justify-end gap-x-2 mt-4">
        <Button color="dark" size="sm" type="button" href="/">Cancel</Button>
        <Button color="green" size="sm" type="submit">Submit</Button>
    </div>
</div>