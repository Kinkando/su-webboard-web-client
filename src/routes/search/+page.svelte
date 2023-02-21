<script lang="ts">
    import { page } from "$app/stores";

    $: searchText = $page.url.searchParams.get('keyword')
</script>

Search by keyword: { searchText }