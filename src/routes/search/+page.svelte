<script lang="ts">
    import { page } from "$app/stores";

    $: searchText = $page.url.searchParams.get('keyword')
</script>

ค้นหากระทู้: { searchText }