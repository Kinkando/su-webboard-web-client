<script lang="ts">
	import { Button } from "flowbite-svelte";

    export let icon: string;
    export let title: string;
    export let description: string;
    export let action = () => {};
    export let href = "";
    export let buttonName = "ดูเพิ่มเติม";
</script>

<div class="ease-in duration-200 flex items-center gap-x-2 text-black dark:text-white">
    <figure class="outline outline-[2px] rounded-full p-1">
        {@html icon}
    </figure>
    <span class="uppercase">{title}</span>
    <span class="text-xs text-gray-400 sm:block hidden overflow-hidden whitespace-nowrap text-ellipsis">{description}</span>
    <Button class="ml-auto uppercase {href ? 'max-[400.1px]:hidden' : ''}" size="xs" color="green" gradient on:click={action} href={href}>{buttonName}</Button>
    {#if href}
        <a class="ml-auto rounded-full bg-[var(--primary-color-75)] dark:bg-gray-700 p-1 min-[400.1px]:hidden" {href}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
        </a>
    {/if}
</div>
<hr class="my-2 border-gray-400">