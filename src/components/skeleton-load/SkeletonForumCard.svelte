<script lang="ts">
    export let ranking = false;
</script>

<div class="no-select ease-in duration-200 bg-gray-50 dark:bg-gray-700 text-black dark:text-gray-400 rounded-md border border-gray-200 dark:border-gray-700 shadow-md drop-shadow-md flex flex-col w-full h-full overflow-hidden">
    <div class="animate-pulse w-full h-full p-4 sm:p-6">
        <div class="flex">
            {#if ranking}
                <div class="flex items-center -mr-2 mt-2">
                    <div class="w-8 h-8 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"></div>
                </div>
            {/if}

            <div class="-mt-2">
                <svg class="inline-block w-20 h-20 {ranking ? 'ml-2' : '-ml-2'} mr-2 text-gray-300 dark:text-gray-600" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>
            </div>

            <section class="flex flex-col gap-y-2 flex-auto">
                <div class="w-2/3 h-5 bg-gray-300 rounded-full dark:bg-gray-600"></div>
                <div class="w-1/3 h-5 bg-gray-300 rounded-full dark:bg-gray-600"></div>
                <div class="max-w-[5rem] h-5 bg-gray-300 rounded-md dark:bg-gray-600"></div>
                <div class="flex flex-wrap items-center gap-1 w-full">
                    <div class="w-12 h-6 bg-gray-300 rounded-md dark:bg-gray-600"></div>
                    <div class="w-12 h-6 bg-gray-300 rounded-md dark:bg-gray-600"></div>
                    <div class="ml-auto flex gap-1">
                        <div class="w-6 h-6 bg-gray-300 rounded-full dark:bg-gray-600"></div>
                        <div class="w-8 h-6 bg-gray-300 rounded-md dark:bg-gray-600"></div>
                        <div class="w-6 h-6 bg-gray-300 rounded-full dark:bg-gray-600"></div>
                        <div class="w-8 h-6 bg-gray-300 rounded-md dark:bg-gray-600"></div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</div>