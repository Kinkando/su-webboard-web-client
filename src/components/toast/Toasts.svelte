<script lang="ts">
    import { dismissToast, toasts } from "@stores/toast";
	import { defined } from '@util/generic';
	import NotificationToast from './NotificationToast.svelte';
</script>

{#if $toasts.length}
    <div class="fixed bottom-0 right-0 z-40 max-w-full w-fit">
        <div class="max-w-md flex flex-col-reverse ml-8">
            {#each $toasts as toast}
                <NotificationToast bind:toast on:dismiss={() => dismissToast(defined(toast.id))} />
            {/each}
        </div>
    </div>
{/if}
