<script lang="ts">
	import { timeRange } from '@util/datetime';

    export let username: string;
    export let userImageURL: string;
    export let createdAt: Date;

    $: time = (() => timeRange(createdAt))()
</script>

<hr class="mt-6 mb-3 dark:border-gray-500">
<div class="flex justify-between items-center">
    <div class="flex items-center overflow-hidden">
        <img src={userImageURL} alt="" class="w-16 h-16 rounded-full">
        <div class="ml-3 space-y-1 overflow-hidden mr-4">
            <div class="font-bold overflow-hidden text-ellipsis whitespace-nowrap">{username}</div>
            <div class="font-light text-sm overflow-hidden text-ellipsis whitespace-nowrap">{time}</div>
        </div>
    </div>
</div>