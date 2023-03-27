<script lang="ts">
    export let button = false;
</script>

<div class="flex items-center p-4 w-full gap-x-2 sm:gap-x-4">
    <svg class="inline-block min-w-[5rem] max-w-[5rem] min-h-[5rem] max-h-[5rem] -ml-2 -my-2 text-gray-300 dark:text-gray-600" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>

    <div class="w-full overflow-hidden -ml-2">
        <div class="w-3/5 max-w-[12rem] h-4 bg-gray-300 rounded-full dark:bg-gray-600" />
        <div class="mt-1.5 w-4/5 max-w-[16rem] h-4 bg-gray-300 rounded-full dark:bg-gray-600" />
    </div>

    {#if button}
        <div class="min-w-[6rem] max-w-[6rem] h-9 bg-gray-300 rounded-md dark:bg-gray-600" />
    {/if}
</div>