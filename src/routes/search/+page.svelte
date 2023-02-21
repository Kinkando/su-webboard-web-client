<script lang="ts">
    import { page } from "$app/stores";
</script>

Search by keyword: { $page.url.searchParams.get('keyword') }