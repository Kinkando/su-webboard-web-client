<script lang="ts">
	import { scale, fade } from 'svelte/transition';
    export let open = false;
    export let title: string = "";
    export let defaultClass = "w-full max-w-2xl"

    // $: if (open != null) {
    //     document.body.style.overflow = open ? "hidden" : "auto";
    // }
</script>

{#key open}
    {#if open}
        <div class="fixed inset-0 z-40 w-screen h-[200vh] bg-gray-900 bg-opacity-50 dark:bg-opacity-80 ease-in duration-200" transition:fade />
        <div id="su-modal" class="fixed top-0 left-0 right-0 z-50 p-4 h-full w-full flex justify-center items-center" tabindex="-1" aria-modal="true" role="dialog" transition:scale >
            <div class="flex relative max-h-full {defaultClass}">
                <div class="bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden border-gray-200 dark:border-gray-700 shadow-md relative flex flex-col mx-auto w-full">
                    {#if title}
                        <div class="flex justify-between items-center p-4 rounded-t bg-[var(--primary-color)] dark:bg-[var(--primary-color-125)] text-white">
                            <h3 class="text-xl font-semibold text-white p-0">{title}</h3>
                            <button type="button" class="ml-auto focus:outline-none whitespace-normal rounded-lg focus:ring-2 p-1.5 absolute top-3 right-2.5" aria-label="Close" on:click={() => open = false}>
                                <span class="sr-only">Close modal</span> <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>
                    {:else}
                        <button type="button" class="ml-auto focus:outline-none whitespace-normal rounded-lg focus:ring-2 p-1.5 absolute top-3 right-2.5" aria-label="Close" on:click={() => open = false}>
                            <span class="sr-only">Close modal</span> <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                    {/if}
                    <div class="p-6 space-y-6 flex-1 overflow-y-auto overscroll-contain">
                        <slot />
                    </div>
                </div>
            </div>
        </div>
    {/if}
{/key}