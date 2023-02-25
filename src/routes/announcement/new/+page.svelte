<script lang="ts">
	import NewPost from "@components/shared/NewPost.svelte";
	import type { Attachment, FormSchema } from "@models/new-post";

    let title: FormSchema = {value: "", label: "หัวข้อการประกาศ", placeholder: "กรุณาใส่หัวข้อสำหรับประกาศจากทางมหาวิทยาลัย..."}
    let description: FormSchema = {value: "", label: "รายละเอียด", placeholder: "กรุณาใส่รายละเอียด..."}
    let attachments: Attachment[] = [];
    let submitName = "ยืนยัน"
    let submit = async() => console.log(title.value, description.value, attachments.length)
</script>

<NewPost bind:title bind:description bind:attachments bind:submitName {submit} />