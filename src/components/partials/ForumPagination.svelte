<script lang="ts">
	import ForumList from '@components/forum/ForumList.svelte';
	import { getForumListByFavoriteUserUUID, getForumListByUserUUID } from '@services/forum';

    export let userUUID: string
    export let query: 'userUUID' | 'favoriteUserUUID'

    let currentPage = 1;
    let limit = 10;

    const fetchData = async () => query === 'userUUID'
        ? await getForumListByUserUUID((currentPage-1)*limit, limit, userUUID)
        : await getForumListByFavoriteUserUUID((currentPage-1)*limit, limit, userUUID)
</script>

<ForumList bind:page={currentPage} bind:limit {fetchData} favorite={query === 'favoriteUserUUID'} />