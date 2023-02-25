<script lang="ts">
    import { page } from "$app/stores";

    $: searchText = $page.url.searchParams.get('keyword')
</script>

<span class="text-black dark:text-white">ค้นหากระทู้: { searchText }</span>