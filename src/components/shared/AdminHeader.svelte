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
        <Button class="hover:scale-105 ease-in duration-200 hidden sm:block" disabled={deleteItemsCount === 0} on:click={() => open = true} color="red" gradient>ลบหลายรายการ</Button>
        <Button class="hover:scale-105 ease-in duration-200" color="greenToBlue" gradient on:click={addItemAction}>{buttonName}</Button>
    </div>
</div>

<DeleteModal bind:open content="คุณยืนยันที่จะลบทั้งหมด {deleteItemsCount} รายการใช่หรือไม่?" deleteButtonName="ยืนยัน" on:delete={multiDeleteAction} />