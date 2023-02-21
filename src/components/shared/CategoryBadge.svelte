<script lang="ts">
	import { onMount } from "svelte";

    export let hexColor: string;
    export let name: string;

    let element: HTMLDivElement;

    onMount(() => element.style.backgroundColor = hexColor)
</script>

<div bind:this={element} class="w-fit py-1 px-2 rounded-md text-xs">
    {name}
</div>