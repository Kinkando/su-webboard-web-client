<script lang="ts">
	import TimeBadge from "@components/badge/TimeBadge.svelte";
    import type { Announcement } from "@models/announcement";
	import { timeRange } from "@util/datetime";

    export let announcement: Announcement;

    const time = (() => timeRange(announcement?.createdAt))()
</script>

<a class="bg-white text-black dark:bg-gray-600 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer p-4 sm:p-6 shadow-md drop-shadow-md rounded-md ease-in duration-200 w-full h-full flex gap-x-4" href={`/announcement/${announcement.announcementUUID}`}>
    <div class="relative w-fit h-fit">
        <a href="/profile/{announcement.authorUUID}">
            <img src="{announcement?.authorImageURL}" alt="" class="z-0 ease-in duration-200 min-w-[4rem] max-w-[4rem] min-h-[4rem] max-h-[4rem] rounded-full cursor-pointer hover:scale-110">
        </a>
    </div>
    <section class="w-full max-w-full overflow-hidden flex flex-col gap-y-1">
        <div class="font-bold text-lg overflow-hidden text-ellipsis whitespace-nowrap">{announcement?.title}</div>
        <a href="/profile/{announcement.authorUUID}" class="overflow-hidden w-fit max-w-full">
            <div class="text-md overflow-hidden text-ellipsis whitespace-nowrap hover:underline">{announcement?.authorName}</div>
        </a>
        <TimeBadge text={time} />
    </section>
</a>