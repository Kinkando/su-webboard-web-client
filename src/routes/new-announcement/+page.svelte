<script lang="ts">
	import NewPost from "@components/shared/NewPost.svelte";
	import type { Attachment, FormSchema } from "@models/new-post";

    let title: FormSchema = {value: "", label: "Announcement Title", placeholder: "Enter an announcement title ..."}
    let description: FormSchema = {value: "", label: "Description", placeholder: "Enter a description ..."}
    let attachments: Attachment[] = [];
    let submit = async() => console.log(title.value, description.value, attachments.length)
</script>

<NewPost bind:title bind:description bind:attachments {submit} />