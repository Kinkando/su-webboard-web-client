<script lang="ts">
    import { page } from "$app/stores";
	import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";

    $: searchText = $page.url.searchParams.get('keyword')
</script>

<div class="mb-4">
    <Breadcrumb aria-label="SU Webboard">
        <BreadcrumbItem href="/" home>หน้าแรก</BreadcrumbItem>
        <BreadcrumbItem>ค้นหากระทู้</BreadcrumbItem>
    </Breadcrumb>
</div>
<span class="text-black dark:text-white">ค้นหากระทู้: { searchText }</span>