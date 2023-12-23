<script lang="ts">
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import { authGuard } from "./auth-guard";

    export let routeID: string
    export let userType: string
    export let isValidToken: boolean

    let status = false;

    onMount(async () => {
        const redirectURL = authGuard(routeID, userType, isValidToken)
        if (redirectURL) {
            if (redirectURL === '/login') {
                location.href = redirectURL;
            } else {
                await goto(redirectURL, { replaceState: true, state: [] })
            }
            history.replaceState(history.state, '', redirectURL)
        }
        status = true
    })
</script>

{#key routeID}
    {#if status}
        <slot />
    {/if}
{/key}