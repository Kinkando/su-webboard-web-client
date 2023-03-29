<script lang="ts">
    export let ranking: number;

    const rankingColor = (() => {
        switch (ranking) {
            case 1: return "background-color: #FFD700 !important; color: #000 !important"
            case 2: return "background-color: #C0C0C0 !important; color: #000 !important"
            case 3: return "background-color: #b87333 !important; color: #000 !important"
            default: return ""
        }
    })()
</script>

<div class="-mr-2 absolute bottom-0 right-0 z-10">
    <div class="w-6 h-6 p-1 relative rounded-full flex items-center z-10 justify-center !bg-gray-200 dark:!bg-gray-800" style={rankingColor}>
        {ranking}
    </div>
    {#if ranking < 4}
        <svg class="w-4 h-4 absolute top-[18px] right-3 rotate-[30deg] z-0 text-red-700" xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
        </svg>
        <svg class="w-4 h-4 absolute top-[18px] left-3 -rotate-[30deg] z-0 text-red-700" xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
        </svg>
    {/if}
</div>