<script lang="ts">
	import { createEventDispatcher } from 'svelte';

    export let isActive = false;
    export let hexColor: string;
    export let name: string;
    export let toggle: boolean|undefined = undefined

	const dispatch = createEventDispatcher();

	function dispatchAction() {
        if(toggle) {
            isActive = !isActive;
        }
		dispatch('click');
	}

    if (hexColor === "primary") {
        hexColor = "var(--primary-color)"
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="ease-in duration-150 relative outline outline-2 hover:scale-110 rounded-md p-1 w-fit bg-white {isActive ? '!text-white dark:!text-black' : '!bg-white dark:!bg-gray-800'}" style="background-color: {hexColor}; outline-color: {hexColor}; color: {hexColor}" on:click={dispatchAction}>
    <div class="flex items-center">
        <div class="ease-in duration-150 rounded-full w-5 h-5 bg-white dark:bg-gray-800 mr-1 relative border-2" style="border-color: {hexColor}">
            {#if isActive}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5 pr-1 pb-0.5" style="color: {hexColor};">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
            {/if}
        </div>
        <span class="font-medium">{name}</span>
    </div>
</div>