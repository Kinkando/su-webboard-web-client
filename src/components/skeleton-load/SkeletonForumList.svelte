<script lang="ts">
	import SkeletonForumCard from "./SkeletonForumCard.svelte";

    export let count: number;
    export let ranking = false;
    export let announcement = false;
</script>

{#each Array(count) as _}
    <div class="my-4">
        <SkeletonForumCard {ranking} {announcement} />
    </div>
{/each}