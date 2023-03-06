<script lang="ts">
	import ForumImage from "./ForumImage.svelte";
	import ForumFooter from "./ForumFooter.svelte";
	import CategoryBadge from "@components/badge/CategoryBadge.svelte";
    import EllipsisMenu from "@components/shared/EllipsisMenu.svelte";
	import type { Announcement } from "@models/announcement";
    import type { ForumDetail } from "@models/forum";
	import type { Attachment, FormSchema } from "@models/new-post";
	import type { Category } from "@models/category";

    export let forumDetail: ForumDetail | Announcement;
    export let categories: Category[] | undefined = undefined;
    export let replyForum = false;

    const type = instanceOfForumDetail(forumDetail) ? 'กระทู้' : 'การประกาศ'

    // Edit modal
    let title: FormSchema = {value: forumDetail.title, label: `หัวข้อ${type}`, placeholder: `กรุณาใส่หัวข้อ${type}...`}
    let description: FormSchema = {value: forumDetail.description!, label: "รายละเอียด", placeholder: "กรุณาใส่รายละเอียด..."}
    let attachments: Attachment[] = [];
    let label = "แสดงความคิดเห็น"

    function instanceOfForumDetail(object: any): object is ForumDetail {
        return 'categories' in object;
    }

    const imageURLs = ((): string[] => {
        const urls = instanceOfForumDetail(forumDetail) ? forumDetail.forumImageURLs : forumDetail.announcementImageURLs
        if (urls) {
            const files: Attachment[] = [];
            urls.forEach(url => {
                files.push({
                    file: new File([], ""),
                    src: url,
                    isLoading: true,
                })
            })
            attachments = [...files]
            return urls
        }
        return []
    })()
</script>

<div class="rounded-lg shadow-md w-full h-full p-4 sm:p-6 overflow-hidden bg-white text-black dark:bg-gray-700 dark:text-white ease-in duration-200">
    <div class="flex">
        <div class="w-full text-xl font-bold">
            {forumDetail.title}
        </div>
        <EllipsisMenu
            ellipsisMenuID={forumDetail?.forumUUID}
            type={type === "กระทู้" ? 'forum': 'announcement'}
            menuSuffixName={type}
            editable
            reportable={type === "กระทู้"}
            removable
            {title}
            {description}
            {categories}
            {attachments}
            on:edit={(event) => console.log(event.detail.title, event.detail.description, event.detail.categories, event.detail.attachments.length)}
            on:report={(event) => console.log(`รายงาน${type}: ${forumDetail.forumUUID}: ${event.detail.reportText}`)}
            on:delete={() => console.log(`ลบ${type}: ${forumDetail.forumUUID}`)}
        />
    </div>
    {#if instanceOfForumDetail(forumDetail) && forumDetail.categories?.length}
        <div class="flex flex-wrap items-center gap-1 mt-1">
            {#each forumDetail.categories as category}
                <CategoryBadge {...category} />
            {/each}
        </div>
    {/if}

    <hr class="my-3 dark:border-gray-500">
    <div class="font-medium">
        {forumDetail.description}
    </div>

    {#if imageURLs?.length}
        <ForumImage {imageURLs} />
    {/if}

    <ForumFooter
        username={forumDetail.authorName}
        userImageURL={forumDetail.authorImageURL}
        likeCount={instanceOfForumDetail(forumDetail) ? forumDetail.likeCount : undefined}
        commentCount={instanceOfForumDetail(forumDetail) ? forumDetail.commentCount : undefined}
        {label}
        replyText={label}
        bind:replyTrigger={replyForum}
        on:comment={event => console.log("แสดงความคิดเห็น", event.detail.comment, event.detail.attachments.length)}
    />
</div>