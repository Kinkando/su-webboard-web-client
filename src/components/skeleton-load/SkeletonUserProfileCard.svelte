<script lang="ts">
    export let menuCount: number;
    export let self: boolean = false;
</script>

<div class="ease-in duration-200 bg-white dark:bg-gray-900 w-full rounded-md shadow-lg p-4 sm:p-6 max-w-4xl m-auto animate-pulse">
    <div class="md:flex md:items-start md:gap-x-6">
        <figure class="md:-ml-6 md:mt-auto -mt-6 w-fit h-fit cursor-pointer m-auto relative">
            <svg class="inline-block w-[17.25rem] h-[17.25rem] text-gray-300 dark:text-gray-600" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>
        </figure>

        <div class="space-y-7 w-full mt-0 my-6 md:-ml-6 ">
            {#each Array(menuCount) as _}
                <div class="space-y-6">
                    <div class="w-1/2 h-4 bg-gray-300 rounded-full dark:bg-gray-600" />
                    <div class="w-full h-4 bg-gray-300 rounded-full dark:bg-gray-600" />
                </div>
            {/each}
        </div>
    </div>

    <div class="flex gap-x-4 justify-end">
        {#if self}
            <div class="md:w-36 w-full h-10 bg-gray-300 rounded-md dark:bg-gray-600" />
            <div class="md:w-36 w-full h-10 bg-gray-300 rounded-md dark:bg-gray-600" />
        {:else}
            <div class="w-36 h-10 bg-gray-300 rounded-md dark:bg-gray-600" />
        {/if}
    </div>
</div>