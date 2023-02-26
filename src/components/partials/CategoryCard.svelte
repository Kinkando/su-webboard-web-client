<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { CategoryDetail } from "@models/category";

    export let category: CategoryDetail;
    export let direction: string;

    const x = (direction === "left" ? -1 : direction === "right" ? 1 : 0) *150
</script>

{#key category}
    <a class="no-select text-black dark:text-white rounded-lg shadow-md flex flex-col w-full h-36 cursor-pointer overflow-hidden relative hover:brightness-75 ease-in duration-200" in:fly={{x, duration: 200, opacity: 1}} href="/category/{category?.categoryID}">
        <div class="absolute w-full h-full opacity-75 z-0" style="background-color: {category?.categoryHexColor}"></div>
        <div class="hover:scale-105 w-full h-full transition-[transform] ease-in duration-200 p-4 sm:p-6 z-10">
            <div class="px-2 py-1 text-xl font-bold overflow-hidden w-fit max-w-full rounded-md text-ellipsis whitespace-nowrap" style="background-color: {category?.categoryHexColor}">
                {category?.categoryName}
            </div>

            <div class="flex overflow-hidden mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                </svg>
                <span class="text-sm ml-1 w-full overflow-hidden text-ellipsis whitespace-nowrap">{category?.forumCount}</span>
            </div>

            <div class="flex overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div class="text-sm ml-1 w-full overflow-hidden text-ellipsis whitespace-nowrap">2 ชั่วโมง</div>
            </div>
        </div>
    </a>
{/key}