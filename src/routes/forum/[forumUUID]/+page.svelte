<script lang="ts">
    import { page } from "$app/stores";
</script>

รายละเอียดกระทู้ | {$page.url.pathname?.substring($page.url.pathname?.lastIndexOf("/")+1)}