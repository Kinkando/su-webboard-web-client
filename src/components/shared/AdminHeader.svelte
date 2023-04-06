<script lang="ts">
	import DeleteModal from "@components/modal/DeleteModal.svelte";
	import { Button, Tooltip } from "flowbite-svelte";
	import { createEventDispatcher } from "svelte";
	import { slide } from "svelte/transition";

    export let title: string;
    export let deleteItemsCount: number;
    export let deletable = true
    export let addable = true

	const dispatch = createEventDispatcher();
    const addItemAction = () => { dispatch("add") }
    const multiDeleteAction = () => { dispatch("delete"); open = false; }

    let open = false;
</script>

{#if deletable}
    <Tooltip placement="bottom" shadow trigger="hover" triggeredBy="#multi-delete-items-button" class="z-30 sm:hidden transition-colors ease-in duration-200 !bg-white !text-[var(--primary-color)] dark:!text-white dark:!bg-gray-700">
        <div in:slide={{duration: 200}}>ลบหลายรายการ</div>
    </Tooltip>
{/if}

{#if addable}
    <Tooltip placement="bottom" shadow trigger="hover" triggeredBy="#add-item-button" class="z-30 sm:hidden transition-colors ease-in duration-200 !bg-white !text-[var(--primary-color)] dark:!text-white dark:!bg-gray-700">
        <div in:slide={{duration: 200}}>เพิ่มรายการ</div>
    </Tooltip>
{/if}

<div class="flex items-center justify-between mb-4">
    <h1 class="font-bold text-2xl">{title}</h1>
    <div class="flex gap-x-2">
        {#if deletable}
            <div id="multi-delete-items-button">
                <Button class="hover:scale-105 ease-in duration-200" disabled={deleteItemsCount === 0} on:click={() => open = true} color="red" gradient>
                    <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                        </svg>
                        <span class="ml-2 hidden sm:block">ลบหลายรายการ</span>
                    </div>
                </Button>
            </div>
        {/if}

        {#if addable}
            <div id="add-item-button">
                <Button class="hover:scale-105 ease-in duration-200" color="greenToBlue" gradient on:click={addItemAction}>
                    <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                        </svg>
                        <span class="ml-2 hidden sm:block">เพิ่มรายการ</span>
                    </div>
                </Button>
            </div>
        {/if}
    </div>
</div>

<DeleteModal bind:open deleteButtonName="ยืนยัน" on:delete={multiDeleteAction} >
    คุณยืนยันที่จะ<span class="text-red-500">ลบทั้งหมด {deleteItemsCount} รายการ</span>ใช่หรือไม่?
</DeleteModal>