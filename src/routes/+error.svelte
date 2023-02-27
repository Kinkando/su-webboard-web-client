<script lang="ts">
	import { Button } from 'flowbite-svelte';
    import { page } from '$app/stores';
	import HTTP from '@commons/http';
</script>

{#if $page.status === HTTP.StatusNotFound && !$page.route.id?.startsWith("/admin-portal")}
    <!-- <h1>{$page.status}: {$page?.error?.message}</h1> -->
    <div class="ease-in duration-200 bg-white dark:bg-gray-900 w-full rounded-md shadow-lg p-4 sm:p-6 inline-block min-h-[calc(100vh-120px-3rem)]">
        <img src="/images/404-not-found.avif" alt="" class="m-auto w-96">
        <div class="text-center text-black dark:text-white space-y-3 mt-6">
            <span class="uppercase font-bold text-xl">ไม่พบหน้าที่คุณต้องการ</span>
            <div>ขออภัย, ไม่พบหน้าที่คุณกำลังมองหาอยู่</div>
            <Button type="button" gradient color="pink" class="mr-2" on:click={() => history.back()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
                <span class="ml-2">ย้อนกลับ</span>
            </Button>
            <Button type="button" gradient color="cyanToBlue" href="/">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <span class="ml-2">หน้าแรก</span>
            </Button>
        </div>
    </div>
{/if}