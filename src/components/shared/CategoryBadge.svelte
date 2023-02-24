<script lang="ts">
    export let hexColor: string;
    export let name: string;
    $: nameURL = name.toLowerCase().replaceAll(" ", "-");
</script>

<a class="w-fit py-1 px-2 rounded-md text-xs text-black hover:brightness-125 hover:scale-110 ease-in duration-200" href="/category/{nameURL}" style="background-color: {hexColor}">
    {name}
</a>