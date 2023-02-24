<script lang="ts">
	import { Button } from "flowbite-svelte";

    export let icon: string;
    export let title: string;
    export let description: string;
    export let action = () => {};
    export let href = "";
    export let buttonName = "see more";
</script>

<div class="ease-in duration-200 flex items-center gap-x-2 text-black dark:text-white">
    <figure class="outline outline-[2px] rounded-full p-1">
        {@html icon}
    </figure>
    <span class="uppercase">{title}</span>
    <span class="text-xs text-gray-400 hidden md:block">{description}</span>
    <Button class="ml-auto uppercase" color="green" gradient on:click={action} href={href}>{buttonName}</Button>
</div>
<hr class="my-2 border-gray-400">