<script lang="ts">
	import ForumList from '@components/forum/ForumList.svelte';
	import { getForumListByUserUUID } from '@services/forum';

    export let userUUID: string

    let currentPage = 1;
    let limit = 10;

    const fetchData = async () => await getForumListByUserUUID((currentPage-1)*limit, limit, userUUID)
</script>

<ForumList bind:page={currentPage} bind:limit {fetchData} />