<script lang="ts">
    import { onMount } from 'svelte';
	import { Button, Input, Label, Textarea } from 'flowbite-svelte';
	import type { Category } from '@models/category';
	import { getAllCategories } from '@services/category';
	import CategoryBadgeToggle from '@components/shared/CategoryBadgeToggle.svelte';

    interface CategoryToggle {
        categoryUUID: string
        isActive: boolean
    }

    let title = "";
    let description = "";
    let categoryToggles: CategoryToggle[] = [];

    let fileInput: HTMLInputElement;
    let files: FileList;

    $: if(files) {
        console.log(...files)
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
                    <div class="animate-pulse ease-in duration-200">
                        <div class="w-20 h-7 bg-gray-300 rounded-md dark:bg-gray-700 m-1"></div>
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

    <div class="flex items-center justify-end gap-x-2 mt-4">
        <Button color="dark" size="sm" type="button" href="/">Cancel</Button>
        <Button color="green" size="sm" type="submit">Submit</Button>
    </div>
</div>