<script lang="ts">
	import RingLoader from 'svelte-loading-spinners/RingLoader.svelte';

    export let isLoading: boolean;
</script>

{#if isLoading}
    <!-- <div class="z-50 fixed w-screen h-screen top-0 left-0 flex justify-center items-center backdrop-brightness-50"> -->
    <!-- <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"> -->
    <div class="z-[70] fixed w-screen h-screen top-0 left-0 flex justify-center items-center">
        <RingLoader color="green" size="100" />
    </div>
{/if}