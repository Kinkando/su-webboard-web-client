<script lang="ts">
	import { likeComment } from "@services/comment";
	import { likeForum } from "@services/forum";

    export let uuid: string = "";
    export let likeCount: number;
    export let toggle = false;
    export let isLike: boolean = false;
    export let type: 'forum' | 'comment' | undefined = undefined

    const likeToggle = async() => {
        if (toggle) {
            isLike = !isLike
            likeCount += isLike ? 1 : -1;

            // Call API like forum or comment, but not wait for response
            if (type === "forum") {
                await likeForum(uuid, isLike)
            } else if (type === "comment") {
                await likeComment(uuid, isLike)
            }
        }
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<svg on:click={likeToggle} xmlns="http://www.w3.org/2000/svg" fill={isLike ? 'red' : 'transparent'} viewBox="0 0 24 24" stroke-width="1.5" stroke={toggle ? 'red' : 'currentColor'} class="w-6 h-6 {toggle ? 'cursor-pointer ease-in duration-200 hover:scale-125' : ''}">
    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
</svg>
<span class="no-select ml-1 text-xs mr-auto">{likeCount}</span>