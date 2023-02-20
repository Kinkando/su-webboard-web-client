<script lang="ts">
	import { Spinner } from "flowbite-svelte";

    export let isLoading: boolean;
</script>

{#if isLoading}
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <Spinner color="green" size="8" />
    </div>
{/if}