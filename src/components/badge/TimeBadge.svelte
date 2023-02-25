<script lang="ts">
	import { Badge } from "flowbite-svelte";

    export let text: string;
</script>

<Badge color="dark" border class="ease-in duration-200 !text-gray-500 !bg-gray-300 dark:!text-gray-400 dark:!bg-gray-700 overflow-hidden w-fit max-w-full">
    <svg aria-hidden="true" class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path></svg>
    <span class="text-xs overflow-hidden text-ellipsis whitespace-nowrap">{text}</span>
</Badge>