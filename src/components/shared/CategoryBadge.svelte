<script lang="ts">
    export let categoryHexColor: string;
    export let categoryName: string;
    export let categoryID: number;
</script>

<a class="w-fit py-1 px-2 rounded-md text-xs text-black hover:brightness-125 hover:scale-110 ease-in duration-200" href="/category/{categoryID}" style="background-color: {categoryHexColor}">
    {categoryName}
</a>