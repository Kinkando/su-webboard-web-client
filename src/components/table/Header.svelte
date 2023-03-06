<script lang="ts">
	import { ButtonGroup, Dropdown, DropdownItem, Input, InputAddon } from "flowbite-svelte";
	import { createEventDispatcher } from "svelte";
	import { slide } from "svelte/transition";
    export let limit: number;

    let searchText = "";
    let open = false;
    const entryList = [10, 25, 50, 100]

    const click = (entry: number) => {
        limit = entry;
        open = false;
    }
    const dispatch = createEventDispatcher<{ [event: string]: { search: string } }>()
    const search = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            dispatch("search", { search: searchText })
        }
    }
</script>

<div class="sm:flex sm:items-center sm:justify-between block sm:mb-4">
    <ButtonGroup class="w-full sm:w-fit" size="md">
        <InputAddon class="py-2 ease-in duration-200">Entries</InputAddon>
        <div class="px-4 py-2 w-full sm:w-fit sm:max-w-[4rem] ease-in duration-200 border dark:border-gray-900 text-gray-600 bg-white dark:text-gray-400 dark:bg-gray-800 rounded-r-lg">{limit}</div>
        <Dropdown class="w-full sm:w-fit py-2 rounded-md bg-gray-50 dark:bg-gray-900" transition={slide} bind:open>
            {#each entryList as entry}
                <DropdownItem defaultClass="font-medium py-2 px-4 text-sm hover:bg-gray-200 dark:hover:bg-gray-600 {limit === entry ? 'bg-gray-200 dark:bg-gray-600' : ''}" on:click={() => click(entry)}>{entry}</DropdownItem>
            {/each}
        </Dropdown>
    </ButtonGroup>

    <div class="sm:my-0 my-4">
        <Input
            class="w-full sm:min-w-[20rem] ease-in duration-200"
            placeholder="ค้นหา..."
            size="md"
            bind:value={searchText}
            on:keydown={search}
        >
            <svg slot="left" aria-hidden="true" class="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>

            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <svg slot="right" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-gray-500 dark:text-gray-400 cursor-pointer" on:click={() => searchText = ""}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </Input>
    </div>
</div>