<script lang="ts">
	import ToggleBadge from "@components/badge/ToggleBadge.svelte";
	import type { Form } from "@models/form";
	import { StatusGroup } from "@models/user";
	import { Button, Input, Label, Radio } from "flowbite-svelte";
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
    const submitAction = () => {
        dispatch("submit", editableForm);
    }
</script>

{#if form?.schemas}
    <Modal bind:open bind:title>
        {#each form?.schemas as schema, index}
            <Label for="title" class="space-y-2 text-black dark:text-white">
                <span>{schema?.label}</span>
                {#if schema?.type === "color"}
                    <div id="category" class="ease-in duration-200 w-full p-2.5 border dark:border-gray-500 text-sm rounded-lg bg-gray-50 dark:bg-gray-700 overflow-x-hidden flex items-center flex-wrap">
                        <input type="color" id="title" class="ease-in duration-200 placeholder-gray-300" bind:value={editableForm.schemas[index].value} placeholder={schema.placeholder} required />
                        <input class="w-[calc(100%-4rem)] ml-2 bg-inherit text-inherit focus:outline-none" bind:value={editableForm.schemas[index].value} placeholder={schema.placeholder} required />
                    </div>
                {:else if schema?.type === "statusToggle"}
                    <div class="flex gap-x-2.5">
                        <Radio bind:group={editableForm.schemas[index].value} value={StatusGroup.nominate} custom class="w-fit my-1.5">
                            <ToggleBadge hexColor="primary" name="เปิดเผยตัวตน" isActive={editableForm.schemas[index].value === StatusGroup.nominate} />
                        </Radio>
                        <Radio bind:group={editableForm.schemas[index].value} value={StatusGroup.anonymous} custom class="w-fit my-1.5">
                            <ToggleBadge hexColor="primary" name="ปกปิดตัวตน" isActive={editableForm.schemas[index].value === StatusGroup.anonymous} />
                        </Radio>
                    </div>
                {:else}
                    <Input type="text" id="title" class="ease-in duration-200 placeholder-gray-300" bind:value={editableForm.schemas[index].value} placeholder={schema.placeholder} required />
                {/if}
            </Label>
        {/each}
        <div class="flex items-center justify-end gap-x-2 mt-4">
            <Button color="red" size="sm" type="reset" on:click={initialize}>รีเซ็ต</Button>
            <Button color="green" size="sm" type="submit" {disabled} on:click={submitAction}>ยืนยัน</Button>
        </div>
    </Modal>
{/if}