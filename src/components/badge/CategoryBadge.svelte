<script lang="ts">
    export let categoryHexColor: string;
    export let categoryName: string;
    export let categoryID: number;
</script>

{#if categoryID > 0}
    <a class="select-none w-fit py-1 px-2 rounded-md text-xs text-black text-center hover:brightness-125 ease-in duration-200 overflow-hidden text-ellipsis whitespace-nowrap min-w-[40px]" href="/category/{categoryID}" style="background-color: {categoryHexColor}">
        {categoryName}
    </a>
{:else}
    <div class="select-none w-fit py-1 px-2 rounded-md text-xs text-black text-center overflow-hidden text-ellipsis whitespace-nowrap min-w-[40px] hover:cursor-default" style="background-color: {categoryHexColor}">
        {categoryName}
    </div>
{/if}