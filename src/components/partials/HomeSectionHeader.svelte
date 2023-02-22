<script lang="ts">
	import { Button } from "flowbite-svelte";

    export let icon: string;
    export let title: string;
    export let description: string;
    export let action: () => {};
    export let buttonName = "see more";
</script>

<div class="flex items-center gap-x-2">
    <figure class="border-2 rounded-full p-1 border-black">
        {@html icon}
    </figure>
    <span class="uppercase">{title}</span>
    <span class="text-xs text-gray-400 hidden md:block">{description}</span>
    <Button class="ml-auto uppercase" color="green" gradient on:click={action}>{buttonName}</Button>
</div>
<hr class="my-2 border-gray-400">