<script lang="ts">
	import type { Category } from "@models/category";

    export let category: Category;
</script>

<div class="dark:bg-gray-800 text-black dark:text-gray-400 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md flex flex-col w-full h-56 cursor-pointer overflow-hidden hover:brightness-75 bg-no-repeat bg-cover brightness-20">
    <div class="hover:scale-105 ease-in duration-200 w-full h-full p-4 sm:p-6">
        {category?.categoryName}
    </div>
</div>