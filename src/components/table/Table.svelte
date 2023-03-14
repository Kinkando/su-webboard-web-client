<script lang="ts">
	import Pagination from '@components/ui/Pagination.svelte';
	import type { ActionTable, DataTable } from "@models/table";
	import { Checkbox, Label } from 'flowbite-svelte';
	import { createEventDispatcher, onMount } from "svelte";
	import Header from './Header.svelte';

    export let columns: string[];
    export let data: DataTable[];
    export let total: number;
    export let limit: number;
    export let skeletonLoad = false;
    export let multiSelect = false;
    export let isLoading = true;
    export let selectedItems: DataTable[] = [];
    export let actions: ActionTable[]|undefined = undefined;

    let actionLabel = "Action";

    let searchText = "";
    let currentPage = 1;
    let initialCount = 0;
    $: (currentPage || limit || searchText) && fetch()
    $: data && loading()
    $: if (selectedItems.length === 0) {
        isSelectAll = false;
    }

    onMount(() => fetch())
    const dispatch = createEventDispatcher<{ [event: string]: { page: number, searchText: string } }>()
    const fetch = () => {
        isLoading = true;
        dispatch("fetch", { page: currentPage, searchText })
    }
    const loading = () => isLoading = (++initialCount) <= 2

    let isSelectAll = false;
    const selectAll = () => {
        isSelectAll = !isSelectAll;
        selectedItems = isSelectAll ? [...data] : [];
    }
    const select = (item: DataTable) => {
        if (selectedItems.find(selectedItem => selectedItem._id === item._id)) {
            selectedItems = selectedItems.filter(selectedItem => selectedItem._id !== item._id);
        } else {
            selectedItems = [...selectedItems, {...item}];
        }
        isSelectAll = false;
    }

    const columnNumber = columns.length + (actions ? 1 : 0) + (multiSelect ? 1 : 0)
</script>

<Header bind:limit on:search={event => searchText = event.detail.searchText} />

<!-- TABLE ON TABLET+ -->
<div class="hidden sm:block relative overflow-x-auto shadow-md drop-shadow-lg rounded-lg mb-4">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ease-in duration-200">
        <thead class="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-900 dark:text-gray-400 ease-in duration-200">
            {#if multiSelect}
                <th class="pl-4 pr-2 py-4">
                    <Checkbox class="ease-in duration-200" color='green' disabled={skeletonLoad && isLoading} on:click={selectAll} bind:checked={isSelectAll} />
                </th>
            {/if}

            {#each columns as column}
                <th class="px-2 py-3">{column}</th>
            {/each}

            {#if actions}
                <th class="px-2 py-3">{actionLabel}</th>
            {/if}
        </thead>

        <tbody>
            <!-- Skeleton Loading -->
            {#if skeletonLoad && isLoading}
                {#each Array(limit) as _}
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ease-in duration-200">
                        {#if multiSelect}
                            <td class="w-8 pl-4 pr-2 py-5">
                                <div class="h-4 bg-gray-300 rounded-md dark:bg-gray-600" />
                            </td>
                        {/if}

                        {#each Array(columns.length) as _, i}
                            <td class="px-2 py-5">
                                <div class="h-4 bg-gray-300 rounded-md dark:bg-gray-600" />
                            </td>
                        {/each}

                        {#if actions}
                            <td class="px-2 py-5">
                                <div class="h-4 bg-gray-300 rounded-md dark:bg-gray-600" />
                            </td>
                        {/if}
                    </tr>
                {/each}
            {:else}
                {#each data as item}
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 ease-in duration-200 w-fit">
                        {#if multiSelect}
                            <td class="pl-4 pr-2 py-4">
                                <Checkbox
                                    class="ease-in duration-200"
                                    color='green'
                                    disabled={skeletonLoad && isLoading}
                                    checked={selectedItems.findIndex((selectedItem) => selectedItem._id === item._id) !== -1}
                                    on:click={() => select(item)}
                                />
                            </td>
                        {/if}

                        {#each item.values as value, index}
                            <td class="px-2 py-4 break-all">{@html value}</td>
                        {/each}

                        {#if actions}
                            <td class="px-2 py-4 w-fit">
                                <div class="flex">
                                    {#each actions as action, index}
                                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                                        <span class="{index ? 'ml-2' : ''}" on:click={() => action.click(item)}>
                                            {@html action.html}
                                        </span>
                                    {/each}
                                </div>
                            </td>
                        {/if}
                    </tr>
                {:else}
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ease-in duration-200">
                        <td class="py-4 text-center" colspan={columnNumber}>ไม่พบข้อมูล</td>
                    </tr>
                {/each}
            {/if}
        </tbody>
    </table>
</div>

<!-- TABLE ON MOBILE -->
<div class="sm:hidden relative overflow-x-auto shadow-md drop-shadow-lg rounded-lg mb-4">
    {#if skeletonLoad && isLoading}
        {#each Array(limit) as _}
            <div class="py-4 px-4 border dark:bg-gray-800 dark:border-gray-700 ease-in duration-200">
                {#each columns as column, i}
                    <Label for="{column}" class="space-y-3 mb-2.5 text-black dark:text-white ease-in duration-200 {i ? 'mt-4' : ''}">
                        <span>{column}</span>
                        <div class="w-full h-4 bg-gray-300 rounded-full dark:bg-gray-600" />
                    </Label>
                {/each}
                {#if actions}
                    <Label for="{actionLabel}" class="space-y-3 text-black dark:text-white ease-in duration-200 mt-4">
                        <span>{actionLabel}</span>
                        <div class="w-full h-6 bg-gray-300 rounded-full dark:bg-gray-600" />
                    </Label>
                {/if}
            </div>
        {/each}
    {:else}
        {#each data as item}
            <div class="py-4 px-4 border dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 ease-in duration-200">
                {#each item.values as value, i}
                    <Label for="{columns[i]}" class="space-y-2 text-black dark:text-white ease-in duration-200 {i ? 'mt-4' : ''}">
                        <span>{columns[i]}</span>
                        <div class="text-gray-500 border border-transparent break-words">{@html value}</div>
                    </Label>
                {/each}

                {#if actions}
                    <Label for="{actionLabel}" class="space-y-2 text-black dark:text-white ease-in duration-200 mt-4">
                        <span>{actionLabel}</span>
                        <div class="text-gray-500 border border-transparent break-words flex w-fit">
                            {#each actions as action, index}
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <span class="{index ? 'ml-2' : ''}" on:click={() => action.click(item)}>
                                    {@html action.html}
                                </span>
                            {/each}
                        </div>
                    </Label>
                {/if}
            </div>
        {/each}
    {/if}
</div>

{#if data.length === 0 && (skeletonLoad && !isLoading)}
    <div class="mt-10 mb-6">
        <img src="/images/empty.png" alt="" class="m-auto w-48">
        <div class="sm:hidden text-center mt-4">ขออภัย ไม่พบข้อมูล</div>
    </div>
{/if}

<Pagination bind:limit bind:total bind:currentPage />
