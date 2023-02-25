<script lang="ts">
    import { page } from "$app/stores";
</script>

<span class="text-black dark:text-white">ประกาศจากทางมหาวิทยาลัย | {$page.url.pathname?.substring($page.url.pathname?.lastIndexOf("/")+1)}</span>