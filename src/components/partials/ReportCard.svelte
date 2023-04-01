<script lang="ts">
	import { Button, Radio, Textarea } from "flowbite-svelte";
	import { createEventDispatcher } from "svelte";

    export let suffixName: string
    export let open: boolean

    $: isOther = reportGroup === "อื่นๆ"

    const reportGroups = [
        "มีการใช้คำที่สื่อถึงการดูถูก ดูหมิ่น หรือเหยียดหยามผู้อื่น",
        "มีการใช้คำเชิงสบประมาท หรือหลอกหลวงผู้อื่น",
        "มีการใช้คำที่ไม่สุภาพหรือไม่เหมาะสม",
        "รบกวนผู้อื่น",
        "อื่นๆ",
    ]
    let reportGroup = ""

    let reportText = "";
    const dispatch = createEventDispatcher()
    function reportAction() {
        dispatch('report', isOther ? reportText : reportGroup)
    }
</script>

<div class="text-center">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
    <h3 class="text-lg font-bold text-gray-500 dark:text-gray-400">คุณต้องการรายงาน{suffixName}นี้หรือไม่?</h3>
    <div class="mt-1 mb-5">คุณสามารถส่งรายงานสิ่งที่ดูไม่เหมาะสมได้ตลอดเวลา และเราจะไม่แจ้งให้ผู้ใดทราบว่าใครเป็นผู้รายงาน</div>
    {#each reportGroups as report}
        <Radio bind:group={reportGroup} value={report} class="w-fit my-1.5">{report}</Radio>
    {/each}
    {#if isOther}
        <Textarea placeholder="กรุณากรอกรายละเอียด ..." bind:value={reportText} class="min-h-[6rem] placeholder-gray-300 !bg-gray-50 dark:!bg-gray-700 sm:mb-4 mb-2" />
    {/if}
    <Button color="red" class="mr-2" disabled={reportGroup.length === 0 || (reportText.length === 0 && isOther)} on:click={reportAction}>ส่งรายงาน</Button>
    <Button color="alternative" on:click={() => open = false}>ยกเลิก</Button>
</div>