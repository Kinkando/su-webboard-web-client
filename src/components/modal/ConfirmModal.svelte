<script lang="ts">
	import Modal from '@components/modal/Modal.svelte';
	import { Button } from "flowbite-svelte";
	import { createEventDispatcher } from 'svelte';

    export let open: boolean
    export let icon: 'logout';

	const dispatch = createEventDispatcher();
    const confirmAction = () => {
        dispatch("confirm")
    }
</script>

<Modal bind:open defaultClass="w-fit ease-in">
    <div class="text-center">
        {#if icon === 'logout'}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
        {/if}
        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            <slot></slot>
        </h3>
        <Button color="red" on:click={() => open = false}>ยกเลิก</Button>
        <Button color="green" class="ml-2" on:click={confirmAction}>ยืนยัน</Button>
    </div>
</Modal>