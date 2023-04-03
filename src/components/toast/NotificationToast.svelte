<script lang="ts">
    import type { NotificationToast } from "@models/toast";
	import NotificationPopup from "@components/notification/NotificationPopup.svelte";
	import { Toast } from "flowbite-svelte";
	import { dismissToast } from "@stores/toast";
    export let toast: NotificationToast;
</script>

<Toast simple position="bottom-right" open divClass="relative m-4 rounded-md overflow-hidden drop-shadow-md shadow-md">
    <div class="flex items-center justify-between p-2">
        <div class="text-base text-black dark:text-gray-200">การแจ้งเตือนใหม่</div>
        <button on:click={() => dismissToast(toast.id)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    </div>
    <NotificationPopup notification={toast.notification} on:read={() => dismissToast(toast.id)} />
</Toast>