<script lang="ts">
    export let forumDetail = false;
</script>

<div class="select-none ease-in duration-200 bg-gray-50 dark:bg-gray-700 text-black dark:text-gray-400 rounded-md border border-gray-200 dark:border-gray-700 shadow-md drop-shadow-md flex flex-col w-full h-full overflow-hidden">
    <div class="animate-pulse w-full h-full p-4 sm:p-6">
        <div class="flex gap-x-4">
            <div class="w-full h-6 bg-gray-300 rounded-full dark:bg-gray-600" />
            {#if forumDetail}
                <div class="min-w-[1.5rem] min-h-[1.5rem] w-6 h-6 bg-gray-300 rounded-full dark:bg-gray-600" />
            {/if}
        </div>

        {#if forumDetail}
            <div class="flex flex-wrap gap-1 mt-2">
                {#each Array(2) as _}
                    <div class="animate-pulse ease-in duration-480">
                        <div class="w-20 h-6 rounded-md bg-gray-300 dark:bg-gray-600 m-1" />
                    </div>
                {/each}
            </div>
        {/if}

        <hr class="my-3 dark:border-gray-500">

        <div class="flex flex-col gap-y-2">
            {#each Array(4) as _}
                <div class="w-full h-5 bg-gray-300 rounded-full dark:bg-gray-600" />
            {/each}
            <div class="w-1/2 h-5 bg-gray-300 rounded-full dark:bg-gray-600" />
        </div>

        <div class="m-auto mt-4 w-64 h-64 bg-gray-300 rounded-md dark:bg-gray-600" />

        <div class="flex overflow-hidden mt-4 gap-x-1">
            {#if forumDetail}
                <div class="w-5 h-5 bg-gray-300 rounded-full dark:bg-gray-600" />
                <div class="w-10 h-5 bg-gray-300 rounded-full dark:bg-gray-600" />
            {/if}
            <div class="ml-auto flex gap-x-1">
                <div class="w-5 h-5 bg-gray-300 rounded-full dark:bg-gray-600" />
                <div class="w-10 h-5 bg-gray-300 rounded-full dark:bg-gray-600" />
            </div>
        </div>

        <hr class="my-3 dark:border-gray-500">

        <header class="flex items-center h-fit">
            <div class="float-left">
                <svg class="inline-block w-16 h-16 mr-2 text-gray-300 dark:text-gray-600" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>
            </div>
            <div class="flex flex-col w-full h-full gap-3">
                <div class="w-full max-w-[16rem] h-3 bg-gray-300 rounded-full dark:bg-gray-600" />
                <div class="w-1/2 max-w-[16rem] h-3 bg-gray-300 rounded-full dark:bg-gray-600" />
            </div>
            {#if forumDetail}
                <div class="ml-4 w-48 h-4 bg-gray-300 rounded-full dark:bg-gray-600" />
            {/if}
        </header>
    </div>
</div>