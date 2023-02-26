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
            <span class="uppercase font-bold text-xl">Page not found</span>
            <div>ขออภัย, ไม่พบหน้าที่คุณกำลังมองหาอยู่ คลิก<a href="/" class="text-blue-500">ที่นี่</a>เพื่อกลับไปยังหน้าแรก</div>
            <Button type="button" gradient color="greenToBlue" on:click={() => history.back()}>Back</Button>
        </div>
    </div>
{/if}