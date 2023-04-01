<script lang="ts">
	import { Button, Helper, Input, Label, Radio } from "flowbite-svelte";
	import { createEventDispatcher } from "svelte";
	import Modal from "./Modal.svelte";
	import ToggleBadge from "@components/badge/ToggleBadge.svelte";
	import type { Form } from "@models/form";
	import { StatusGroup } from "@models/user";
    import { alert } from "@stores/alert";
	import { maxLength, validateFormPattern } from "@util/validation";

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
    $: disabled = (() => editableForm.schemas.find(schema => schema.value === ""))()

	const dispatch = createEventDispatcher<{[eventName: string]: Form}>();
    const submitAction = () => {
        for (let i=0; i<editableForm.schemas.length; i++) {
            const schema = editableForm.schemas[i]
            if (!schema.value) {
                alert({
                    type: 'error',
                    message: `กรุณากรอกข้อมูลให้ครบถ้วน`
                })
                form.schemas.forEach((_, index) => form.schemas[index].error = !form.schemas[index].value.length ? 'required' : '')
                return
            }
            if (schema.minlength && schema.value.length < schema.minlength) {
                const error = `${schema.label} ต้องมีความยาวอย่างน้อย ${schema.minlength} ตัวอักษร`
                alert({
                    type: 'error',
                    message: error,
                })
                form.schemas[i].error = error
                return
            }
        }
        dispatch("submit", editableForm);
    }

    $: if(form) {
        for(let schema of editableForm.schemas) {
            if (schema.validations) {
                for (let validate of schema.validations) {
                    schema.value = validate(schema.value)
                }
            }
            if (schema.pattern) {
                schema.value = validateFormPattern(schema.value, schema.pattern)
            }
            if (schema.maxlength) {
                schema.value = maxLength(schema.value, schema.maxlength)
            }
        }
    }
</script>

{#if form?.schemas}
    <Modal bind:open bind:title>
        {#each form?.schemas as schema, index}
            <Label for="title" color={schema.error ? 'red' : 'gray'} class="space-y-2 {!schema.error ? 'text-black dark:text-white' : ''}">
                <span>{schema?.label}</span>
                {#if schema?.type === "color"}
                    <div id="category" class="ease-in duration-200 w-full p-2.5 border dark:border-gray-500 text-sm rounded-lg bg-gray-50 dark:bg-gray-700 overflow-x-hidden flex items-center flex-wrap {schema.error ? '!border-[#f05252] text-[#f05252]' : ''}">
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
                    <Input
                        type="text"
                        id="title"
                        class="ease-in duration-200 placeholder-gray-300"
                        color={schema.error ? 'red' : 'base'}
                        disabled={schema.disabled}
                        bind:value={editableForm.schemas[index].value}
                        placeholder={schema.placeholder}
                        required
                    />
                {/if}
                {#if schema.error && schema.error !== 'required'}
                    <Helper class="mt-2" color="red">{schema.error}</Helper>
                {/if}
            </Label>
        {/each}
        <div class="flex items-center justify-end gap-x-2 mt-4">
            <Button color="red" size="sm" type="reset" on:click={initialize}>รีเซ็ต</Button>
            <Button color="green" size="sm" type="submit" {disabled} on:click={submitAction}>ยืนยัน</Button>
        </div>
    </Modal>
{/if}