<script lang="ts">
	import RingLoader from 'svelte-loading-spinners/RingLoader.svelte';

    export let isLoading: boolean;
</script>

{#if isLoading}
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <RingLoader color="green" size="100" />
    </div>
{/if}