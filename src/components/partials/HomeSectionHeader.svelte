<script lang="ts">
	import { Button } from "flowbite-svelte";

    export let icon: string;
    export let title: string;
    export let description: string;
    export let url: string = "";
</script>

<div class="flex items-center gap-x-2">
    <figure class="border-2 rounded-full p-1 border-black">
        {@html icon}
    </figure>
    <span class="uppercase">{title}</span>
    <span class="text-xs text-gray-400">{description}</span>
    {#if url}
        <Button class="ml-auto uppercase" color="green" gradient href={url}>see more</Button>
    {/if}
</div>
<hr class="my-2 border-gray-400">