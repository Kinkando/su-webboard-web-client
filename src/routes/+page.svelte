<script lang="ts">
	import { onMount } from 'svelte';
	import HomeSectionHeader from '@components/partials/HomeSectionHeader.svelte';
	import AnnouncementCard from '@components/partials/AnnouncementCard.svelte';
	import PopularCard from '@components/partials/PopularCard.svelte';
	import CategoryCard from '@components/partials/CategoryCard.svelte';
	import SkeletonAnnouncementCard from '@components/skeleton-load/SkeletonAnnouncementCard.svelte';
	import SkeletonCategoryCard from '@components/skeleton-load/SkeletonCategoryCard.svelte';
	import SkeletonPopularCard from '@components/skeleton-load/SkeletonPopularCard.svelte';
    import type { Home } from '@models/home';
	import { getHomeData } from '@services/forum';

    const sectionHeaders = [
        {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" /></svg>`,
            title: "Announcement",
            description: "Notices from university, Please pay attention.",
            url: "/announcement",
        },
        {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" /></svg>`,
            title: "Popular Topics",
            description: "List of hot topics during this week! Hop in and see what's happening right now!",
            url: "/popular",
        },
        {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" /><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" /></svg>`,
            title: "Categories",
            description: "List of tags which is being discussed until now.",
        },
    ];

    let home: Home;
    onMount(async() => home = await getHomeData())

    let carouselIndex = 0;
    const setCarouselIndex = (index: number) => {
        if (index > (home?.categories?.length - carouselAmount) || index < 0) {
            return;
        }
        carouselDirection = index > carouselIndex ? "right" : "left";
        carouselIndex = index;
    }
    let carouselDirection = "";

    let innerWidth = 0;
    let minimumCardWidth = 325;
    let minimumCategoryCardWidth = 200;

    $: colAmount = Math.round(innerWidth/minimumCardWidth);
    $: carouselAmount = Math.round(innerWidth/minimumCategoryCardWidth);
</script>

<svelte:window bind:innerWidth />

<!-- Announcement -->
<HomeSectionHeader {...sectionHeaders[0]} />
<div class="flex w-full gap-x-2 mb-10">
    {#if home}
        {#each home?.announcements?.slice(0, Math.min(home?.announcements.length, colAmount)) as announcement}
            <AnnouncementCard {announcement} />
        {/each}
    {:else}
        {#each Array(colAmount) as _}
            <SkeletonAnnouncementCard />
        {/each}
    {/if}
</div>

<!-- Popular Topics -->
<HomeSectionHeader {...sectionHeaders[1]} />
<div class="flex w-full gap-x-2 mb-10">
    {#if home}
        {#each home?.popularTopics?.slice(0, Math.min(home?.announcements.length, colAmount)) as popularTopic}
            <PopularCard {popularTopic} />
        {/each}
    {:else}
        {#each Array(colAmount) as _}
            <SkeletonPopularCard />
        {/each}
    {/if}
</div>

<!-- Categories -->
<HomeSectionHeader {...sectionHeaders[2]} />
<div class="flex w-full gap-x-2 mb-10 items-center overflow-x-hidden">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="rounded-full p-1 bg-gray-200 shadow-md cursor-pointer" on:click={() => setCarouselIndex(carouselIndex - 1)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
    </div>

    {#if home}
        {#each home?.categories?.slice(carouselIndex, carouselIndex+carouselAmount) as category}
            {#key category}
                <CategoryCard bind:direction={carouselDirection} {category} />
            {/key}
        {/each}
    {:else}
        {#each Array(carouselAmount) as _}
            <SkeletonCategoryCard />
        {/each}
    {/if}

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="rounded-full p-1 bg-gray-200 shadow-md cursor-pointer" on:click={() => setCarouselIndex(carouselIndex + 1)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
    </div>
</div>