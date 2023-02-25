<script lang="ts">
	import type { Category } from "@models/category";

    export let data: Category;
    const category = data
</script>

<span class="text-black dark:text-white">หมวดหมู่ / {category?.categoryName}</span>
