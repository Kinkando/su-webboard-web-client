<script lang="ts">
    import { page } from '$app/stores';
	import HTTP from '@commons/http';
	import NotFound from '@components/shared/NotFound.svelte';
</script>

{#if $page.status === HTTP.StatusNotFound && !$page.route.id?.startsWith("/admin-portal")}
    <!-- <h1>{$page.status}: {$page?.error?.message}</h1> -->
    <div class="ease-in duration-200 bg-white dark:bg-gray-900 w-full rounded-md shadow-lg p-4 sm:p-6 inline-block min-h-[calc(100vh-120px-3rem)]">
        <NotFound />
    </div>
{/if}