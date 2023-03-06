<script lang="ts">
	import type { Form } from "@models/form";
	import { Button, Input, Label } from "flowbite-svelte";
	import { createEventDispatcher } from "svelte";
	import Modal from "./Modal.svelte";

    export let open = false;
    export let title: string;
    export let form: Form;

    let editableForm: Form = { schemas: [] };
    $: open && initialize()
    const initialize = () => {
        const initForm: Form = {
            _id: form._id,
            schemas: [],
        };
        form?.schemas.forEach(schema => initForm.schemas.push({...schema}))
        editableForm = {...initForm};
    }
    const disabled = (() => editableForm.schemas.find(schema => schema.value === ""))()

	const dispatch = createEventDispatcher<{[eventName: string]: Form}>();
    const submitAction = () => { dispatch("submit", editableForm); open = false; }
</script>

{#if form?.schemas}
    <Modal bind:open bind:title>
        {#each form?.schemas as schema, index}
            <Label for="title" class="space-y-2 text-black dark:text-white">
                <span>{schema.label}</span>
                <Input type="text" id="title" class="ease-in duration-200 placeholder-gray-300" bind:value={editableForm.schemas[index].value} placeholder={schema.placeholder} required />
            </Label>
        {/each}
        <div class="flex items-center justify-end gap-x-2 mt-4">
            <Button color="red" size="sm" type="reset" on:click={initialize}>รีเซ็ต</Button>
            <Button color="green" size="sm" type="submit" {disabled} on:click={submitAction}>ยืนยัน</Button>
        </div>
    </Modal>
{/if}