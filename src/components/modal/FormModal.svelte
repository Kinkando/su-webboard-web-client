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
    // $: disabled = (() => editableForm.schemas.find(schema => schema.value === ""))()

	const dispatch = createEventDispatcher<{[eventName: string]: Form}>();
    const submitAction = () => {
        let error = '';
        for (const schema of editableForm.schemas) {
            if (!schema.value) {
                alert({
                    type: 'error',
                    message: `กรุณากรอกข้อมูลให้ครบถ้วน`
                })
                form.schemas.forEach((_, index) => form.schemas[index].error = !editableForm.schemas[index].value ? 'required' : '')
                return
            }
        }
        for (let i=0; i<editableForm.schemas.length; i++) {
            const schema = editableForm.schemas[i]
            if (schema.minlength && schema.value.length < schema.minlength) {
                error = `กรอกข้อมูลไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง`
                form.schemas[i].error = error
            } else {
                form.schemas[i].error = ''
            }
        }
        if (error) {
            alert({
                type: 'error',
                message: error,
            })
            return
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

    $: type = (t: string) => t as any
</script>

{#if form?.schemas}
    <Modal bind:open bind:title>
        {#each form?.schemas as schema, index}
            <Label for="{schema.id}" color={schema.error ? 'red' : 'gray'} class="space-y-2 {!schema.error ? 'text-black dark:text-white' : ''}">
                <span>{schema?.label}</span>
                {#if schema?.type === "color"}
                    <div id="category" class="ease-in duration-200 w-full p-2.5 border dark:border-gray-500 text-sm rounded-lg bg-gray-50 dark:bg-gray-700 overflow-x-hidden flex items-center flex-wrap {schema.error ? '!border-[#f05252] text-[#f05252]' : ''}">
                        <input type="color" id="{schema.id}" class="ease-in duration-200 placeholder-gray-300" bind:value={editableForm.schemas[index].value} placeholder={schema.placeholder} required />
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
                        type="{type(!schema.isShow ? schema.type : 'text')}"
                        id="{schema.id}"
                        class="ease-in duration-200 placeholder-gray-300"
                        color={schema.error ? 'red' : 'base'}
                        disabled={schema.disabled}
                        bind:value={editableForm.schemas[index].value}
                        placeholder={schema.placeholder}
                        required
                    >
                        <button slot="right" on:click={() => schema.isShow = !schema.isShow} class="{schema.type === 'password' ? '' : 'hidden'} pointer-events-auto">
                            {#if schema.type === 'password' && schema.isShow}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            {:else if schema.type === 'password' && !schema.isShow}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                            {/if}
                        </button>
                    </Input>
                {/if}
                {#if schema.error && schema.error !== 'required'}
                    <Helper class="mt-2" color="red">{schema.error}</Helper>
                {/if}
            </Label>
        {/each}
        <div class="flex items-center justify-end gap-x-2 mt-4">
            <Button color="red" size="sm" type="reset" on:click={initialize}>รีเซ็ต</Button>
            <Button color="green" size="sm" type="submit" on:click={submitAction}>ยืนยัน</Button>
        </div>
    </Modal>
{/if}