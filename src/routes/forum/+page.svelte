<script lang="ts">
	import NewPost from "@components/shared/NewPost.svelte";
	import type { Attachment, FormSchema } from "@models/new-post";

    let title: FormSchema = {value: "", label: "หัวข้อกระทู้", placeholder: "กรุณาใส่หัวข้อกระทู้..."}
    let description: FormSchema = {value: "", label: "รายละเอียด", placeholder: "กรุณาใส่รายละเอียด..."}
    let categoryIDs: number[] = [];
    let attachments: Attachment[] = [];
    let submitName = "สร้างกระทู้";
    let submit = async() => console.log(title.value, description.value, categoryIDs, attachments.length)
</script>

<NewPost bind:title bind:description bind:categoryIDs bind:attachments bind:submitName {submit} />