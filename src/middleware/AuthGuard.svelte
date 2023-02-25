<script lang="ts">
	import { goto } from "$app/navigation";
	import { redirect } from "@sveltejs/kit";
	import { onMount, onDestroy } from "svelte";
	import { authGuard } from "./auth-guard";

    export let routeID: string
    export let userType: string
    export let isValidToken: boolean

    let status = false;

    onMount(async () => {
        const redirectURL = authGuard(routeID, userType, isValidToken)
        if (redirectURL) {
            await goto(redirectURL, { replaceState: true, state: [] })
        }
        status = true
    })
</script>

{#key routeID}
    {#if status}
        <slot />
    {/if}
{/key}