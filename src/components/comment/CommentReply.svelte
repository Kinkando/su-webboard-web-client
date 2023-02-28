<script lang="ts">
	import type { Attachment } from "@models/new-post";
	import { Button, Spinner, Textarea } from "flowbite-svelte";

    export let label: string;
    export let comment: string;
    export let attachments: Attachment[];

    export let cancel: () => void;
    export let submit: () => void;

    let fileInput: HTMLInputElement;
    let files: FileList;

    $: files && addImage(...files)
    const addImage = (...files: File[]) => {
        attachments = attachments.concat(...files.map(file => {
            const attachment: Attachment = {
                src: URL.createObjectURL(file),
                isLoading: true,
                file,
            }
            return attachment
        }))
    }
    const removeImage = (index: number) => attachments = attachments.filter((_, idx) => index !== idx)
</script>

<div>
    <div class="flex items-center">
        <div class="font-light text-lg text-gray-400 mb-2 w-full">{label}</div>
    </div>

    <Textarea placeholder="ใส่ข้อความเพื่อแสดงความคิดเห็นได้ที่นี่ ..." bind:value={comment} class="min-h-[6rem] placeholder-gray-300
    !bg-gray-50 dark:!bg-gray-700" />

    <hr class="my-4 dark:border-gray-600">
    <footer class="flex justify-between items-center">
        <input bind:this={fileInput} type="file" accept="image/*" multiple hidden bind:files>
        <Button size="sm" color="purple" gradient on:click={() => fileInput.click()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
            </svg>
            <span class="ml-1">แนบรูปภาพ</span>
        </Button>
        <div class="flex items-center gap-x-2 ml-2">
            <Button color="pink" size="sm" gradient type="reset" on:click={cancel}>ยกเลิก</Button>
            <Button color="green" size="sm" gradient type="submit" disabled={comment.length === 0} on:click={submit}>ยืนยัน</Button>
        </div>
    </footer>

    <div class="no-select flex flex-wrap sm:gap-4 gap-2 {attachments.length ? 'mt-4' : ''}">
        {#each attachments as attachment, index}
            <div class="relative overflow-hidden rounded-md  aspect-square">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="cursor-pointer rounded-full p-1 z-10 absolute top-1 right-1 bg-[#e15e3f] w-fit h-fit" on:click={() => removeImage(index)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-white">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </div>
                {#if attachment.isLoading}
                    <figure class="w-48 h-48 animate-pulse ease-in duration-200 absolute z-0 bg-gray-400 flex items-center justify-center">
                        <Spinner size="10" />
                    </figure>
                {/if}
                <img
                    src="{attachment.src}"
                    alt="{attachment.file.name}"
                    class="w-48 h-48 hover:scale-105 ease-in duration-200 hover:brightness-75 "
                    on:load={() => attachment.isLoading = false}
                >
            </div>
        {/each}
    </div>
</div>

<slot />