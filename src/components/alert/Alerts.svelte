<script lang="ts">
    import Alert from './Alert.svelte';
    import { dismissAlert, alerts } from "@stores/alert";
	import { defined } from '@util/generic';
</script>

{#key $alerts.length}
    {#each $alerts as alert (alert.id)}
        <Alert bind:alert on:dismiss={() => dismissAlert(defined(alert.id))} />
    {/each}
{/key}
