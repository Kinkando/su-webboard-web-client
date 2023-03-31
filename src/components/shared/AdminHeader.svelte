<script lang="ts">
	import DeleteModal from "@components/modal/DeleteModal.svelte";
	import { Button } from "flowbite-svelte";
	import { createEventDispatcher } from "svelte";

    export let title: string;
    export let buttonName: string
    export let deleteItemsCount: number;

	const dispatch = createEventDispatcher();
    const addItemAction = () => { dispatch("add") }
    const multiDeleteAction = () => { dispatch("delete"); open = false; }

    let open = false;
</script>

<div class="flex items-center justify-between mb-4">
    <h1 class="font-bold text-2xl">{title}</h1>
    <div class="flex gap-x-2">
        <Button class="hover:scale-105 ease-in duration-200" disabled={deleteItemsCount === 0} on:click={() => open = true} color="red" gradient>
            <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                </svg>
                <span class="ml-2 hidden sm:block">ลบหลายรายการ</span>
            </div>
        </Button>
        <Button class="hover:scale-105 ease-in duration-200" color="greenToBlue" gradient on:click={addItemAction}>
            <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                </svg>
                <span class="ml-2 hidden sm:block">{buttonName}</span>
            </div>
        </Button>
    </div>
</div>

<DeleteModal bind:open deleteButtonName="ยืนยัน" on:delete={multiDeleteAction} >
    คุณยืนยันที่จะ<span class="text-red-500">ลบทั้งหมด {deleteItemsCount} รายการ</span>ใช่หรือไม่?
</DeleteModal>