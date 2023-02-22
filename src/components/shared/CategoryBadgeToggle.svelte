<script lang="ts">
	import type { Category } from "@models/category";

    export let isActive = false;
    export let category: Category;
</script>

<button class="transition-all ease-in duration-150 relative outline outline-1 rounded-md p-1 w-fit m-1 {isActive ? '!text-white' : '!bg-white'}" style="background-color: {category.categoryHexColor}; outline-color: {category.categoryHexColor}; color: {category.categoryHexColor}" on:click={() => isActive = !isActive}>
    <div class="flex items-center">
        <div class="rounded-full w-5 h-5 bg-white mr-1 relative border-[1px]" style="border-color: {category.categoryHexColor}">
            {#if isActive}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5 pr-0.5" style="color: {category.categoryHexColor};">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
            {/if}
        </div>
        {category.categoryName}
    </div>
</button>