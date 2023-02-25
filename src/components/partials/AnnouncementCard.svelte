<script lang="ts">
	import type { Announcement } from "@models/announcement";

    export let announcement: Announcement;
</script>

<a class="rounded-lg shadow-md flex flex-col w-full h-56 cursor-pointer overflow-hidden hover:brightness-75" href="/announcement/{announcement?.forumUUID}">
    <div class="bg-[var(--primary-color-75)] text-black dark:bg-[var(--primary-color-125)] dark:text-white ease-in duration-200 hover:scale-105 w-full h-full p-4 sm:p-6">
        <header class="flex items-center gap-x-3">
            <img src="{announcement?.authorImageURL}" alt="" class="w-12">
            <div class="flex flex-col overflow-hidden">
                <span class="text-md overflow-hidden text-ellipsis whitespace-nowrap">{announcement?.authorName}</span>
                <span class="text-xs overflow-hidden text-ellipsis whitespace-nowrap">2 ชั่วโมง</span>
                <!-- <TimeBadge text="2 ชั่วโมง" /> -->
            </div>
        </header>
        <section class="mt-2">
            <div class="text-xl overflow-hidden text-ellipsis whitespace-nowrap">{announcement?.title}</div>
            <div class="text-sm overflow-hidden text-ellipsis line-clamp-5 text-gray-700 dark:text-gray-200 ease-in duration-200">{announcement?.description}</div>
        </section>
    </div>
</a>