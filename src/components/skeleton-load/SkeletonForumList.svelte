<script lang="ts">
	import SkeletonForumCard from "./SkeletonForumCard.svelte";

    export let count: number;
    export let ranking = false;
    export let announcement = false;
    export let favorite = false;
</script>

{#each Array(count>0 ? count : 10) as _}
    <div class="mb-4">
        <SkeletonForumCard {ranking} {announcement} {favorite} />
    </div>
{/each}