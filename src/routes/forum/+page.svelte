<script lang="ts">
	import NewPost from "@components/shared/NewPost.svelte";
	import type { Attachment, FormSchema } from "@models/new-post";

    let title: FormSchema = {value: "", label: "Topic Title", placeholder: "Enter a topic title ..."}
    let description: FormSchema = {value: "", label: "Description", placeholder: "Enter a description ..."}
    let categoryUUIDs: string[] = [];
    let attachments: Attachment[] = [];
    let submit = async() => console.log(title.value, description.value, categoryUUIDs, attachments.length)
</script>

<NewPost bind:title bind:description bind:categoryUUIDs bind:attachments {submit} />