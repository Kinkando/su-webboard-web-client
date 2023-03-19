<script lang="ts">
	import type { Announcement } from "@models/announcement";
	import { timeRange } from "@util/datetime";

    export let announcement: Announcement;
</script>

<a class="rounded-lg shadow-md flex flex-col w-full h-56 cursor-pointer overflow-hidden" href="/announcement/{announcement?.announcementUUID}">
    <div class="bg-[var(--primary-color-75)] text-black dark:bg-[var(--primary-color-125)] dark:text-white ease-in duration-200 hover:brightness-75 hover:scale-105 w-full h-full p-4 sm:p-6">
        <header class="flex items-center gap-x-3">
            <img src="{announcement?.authorImageURL}" alt="" class="min-w-[3rem] max-w-[3rem] min-h-[3rem] max-h-[3rem] rounded-full">
            <div class="flex flex-col overflow-hidden">
                <span class="text-md overflow-hidden text-ellipsis whitespace-nowrap">{announcement?.authorName}</span>
                <span class="text-xs overflow-hidden text-ellipsis whitespace-nowrap">{timeRange(announcement.createdAt)}</span>
                <!-- <TimeBadge text="2 ชั่วโมง" /> -->
            </div>
        </header>
        <section class="mt-2">
            <div class="text-xl overflow-hidden text-ellipsis whitespace-nowrap">{announcement?.title}</div>
            <div class="text-sm overflow-hidden text-ellipsis line-clamp-5 text-gray-700 dark:text-gray-200 ease-in duration-200">{announcement?.description}</div>
        </section>
    </div>
</a>