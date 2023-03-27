<script lang="ts">
    export let tabCount = 3;
</script>

<div class="ease-in duration-200 w-full max-w-4xl mt-4 m-auto animate-pulse">
    <div class="flex gap-x-1">
        {#each Array(tabCount) as _}
            <div class="w-32 h-[54px] bg-gray-300 rounded-t-md dark:bg-gray-600" />
        {/each}
    </div>
    <div class="w-full h-0.5 bg-gray-300 rounded-md dark:bg-gray-600" />
</div>


<div class="ease-in duration-200 bg-white dark:bg-gray-900 w-full rounded-md shadow-lg p-4 max-w-4xl mt-4 m-auto">
    <slot />
</div>