<script lang="ts">
	import type { Announcement } from "@models/announcement";

    export let announcement: Announcement;
</script>

<div class="bg-[#aad4c7] dark:bg-gray-800 text-black dark:text-gray-400 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md flex max-w-sm flex-col w-full h-56 cursor-pointer overflow-hidden hover:brightness-75">
    <div class="hover:scale-105 ease-in duration-200 w-full h-full p-4 sm:p-6">
        <header class="flex items-center gap-x-3">
            <img src="{announcement?.authorImageURL}" alt="" class="w-12">
            <div class="flex flex-col">
                <span class="text-md">{announcement?.authorName}</span>
                <span class="text-xs">2 hours ago</span>
            </div>
        </header>
        <section class="mt-2">
            <div class="text-xl overflow-hidden text-ellipsis whitespace-nowrap">{announcement?.title}</div>
            <div class="text-sm overflow-hidden text-ellipsis line-clamp-5 text-gray-600">{announcement?.description}</div>
        </section>
    </div>
</div>