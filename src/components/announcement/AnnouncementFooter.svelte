<script lang="ts">
	import { timeRange } from '@util/datetime';

    export let userUUID: string
    export let userDisplayName: string;
    export let userImageURL: string;
    export let createdAt: Date;

    $: time = (() => timeRange(createdAt))()
</script>

<hr class="mt-6 mb-3 dark:border-gray-500">
<div class="flex justify-between items-center">
    <div class="flex items-center overflow-hidden">
        <a href="/profile/{userUUID}">
            <img src={userImageURL} alt="" class="min-w-[4rem] max-w-[4rem] min-h-[4rem] max-h-[4rem] rounded-full hover:brightness-75 ease-in duration-200">
        </a>
        <div class="ml-3 space-y-1 overflow-hidden mr-4">
            <a href="/profile/{userUUID}" class="overflow-hidden">
                <div class="font-bold overflow-hidden text-ellipsis whitespace-nowrap hover:underline">{userDisplayName}</div>
            </a>
            <div class="font-light text-sm overflow-hidden text-ellipsis whitespace-nowrap">{time}</div>
        </div>
    </div>
</div>