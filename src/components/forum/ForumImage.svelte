<script lang="ts">
	import { Spinner } from "flowbite-svelte";

    export let imageURLs: string[]

    $: imagesIsLoading = ((): boolean[] => {
        const loading: boolean[] = [];
        imageURLs.forEach(image => loading.push(true))
        return loading
    })()
</script>

<div class="mt-6 gap-2 no-select flex flex-wrap items-center justify-center w-full h-fit">
    {#each imageURLs as imageURL, index}
        <div class="relative overflow-hidden rounded-md aspect-square">
            {#if imagesIsLoading[index]}
                <figure class="w-72 h-72 animate-pulse ease-in duration-200 absolute z-0 bg-gray-400 flex items-center justify-center">
                    <Spinner size="10" />
                </figure>
            {/if}
            <img
                alt=""
                src="{imageURL}"
                class="w-72 h-72 hover:scale-105 ease-in duration-200 hover:brightness-75"
                on:load={() => imagesIsLoading[index] = false}
            >
        </div>
    {/each}
</div>