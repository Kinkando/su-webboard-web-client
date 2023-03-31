<script lang="ts">
	import type { Alert as AlertModel } from '@models/alert';
    import { fly, fade } from 'svelte/transition';
    import { Alert } from 'flowbite-svelte';

    export let alert: AlertModel;

    $: color = (() => {
        switch (alert.type) {
            case 'success': return 'green';
            case 'warning': return 'yellow';
            case 'error': return 'red';
        }
    })()
</script>

<div class="fixed top-6 left-0 right-0 w-fit m-auto flex flex-col justify-start items-center z-[1000]">
    <div class="mx-4 shadow-lg" in:fly="{{duration: 300, x: 100}}" out:fade="{{duration: 200}}">
        <Alert border bind:color dismissable>
            <span slot="icon">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
            </span>
            <span class="mr-2">{alert.message}</span>
        </Alert>
    </div>
</div>