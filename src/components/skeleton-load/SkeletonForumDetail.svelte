<script lang="ts">
    export let forumDetail = false;
</script>

<div class="select-none ease-in duration-200 bg-gray-50 dark:bg-gray-700 text-black dark:text-gray-400 rounded-md border border-gray-200 dark:border-gray-700 shadow-md drop-shadow-md flex flex-col w-full h-full overflow-hidden max-w-5xl m-auto">
    <div class="animate-pulse w-full h-full p-4 sm:p-6">
        <!-- Header: Forum Title -->
        <div class="flex gap-x-4">
            <div class="w-full h-6 bg-gray-300 rounded-full dark:bg-gray-600" />
            {#if forumDetail}
                <div class="min-w-[1.5rem] min-h-[1.5rem] w-6 h-6 bg-gray-300 rounded-full dark:bg-gray-600" />
            {/if}
        </div>

        <!-- Header: Category Badge -->
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

        <!-- Content: Forum Description -->
        <div class="flex flex-col gap-y-2">
            {#each Array(4) as _}
                <div class="w-full h-5 bg-gray-300 rounded-full dark:bg-gray-600" />
            {/each}
            <div class="w-1/2 h-5 bg-gray-300 rounded-full dark:bg-gray-600" />
        </div>

        <!-- Content: Forum Image -->
        <div class="m-auto mt-4 w-64 h-64 bg-gray-300 rounded-md dark:bg-gray-600 relative">
            <svg width="48" height="48" class="animate-pulse text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512">
                <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"></path>
            </svg>
        </div>

        <!-- Content: Footer Icon -->
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

        <!-- Footer: User Panel -->
        <footer class="flex items-center h-fit">
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
        </footer>
    </div>
</div>