<script lang="ts">
    import { page } from "$app/stores";
	import { Field, Order } from "@commons/order";
	import ForumList from "@components/forum/ForumList.svelte";
	import { searchForum } from "@services/forum";
	import { Breadcrumb, BreadcrumbItem, Button, Chevron, Dropdown, Helper, Radio } from "flowbite-svelte";
	import { slide } from "svelte/transition";

    const defaultMetadata = {
        page: 1,
        limit: 10,
        field: Field.CreatedAt,
        order: Order.DESC,
    }

    $: searchText = $page.url.searchParams.get('keyword')?.trim() || ''

    let currentPage = Number($page.url.searchParams.get('page')) || defaultMetadata.page;
    let limit = Number($page.url.searchParams.get('limit')) || defaultMetadata.limit;
    let field: Field = defaultMetadata.field;
    let order: Order = defaultMetadata.order;
    let sortBy = `${field}@${order}`

    let open = false
    let fieldsGroup = [
        { name: 'วันที่สร้างกระทู้', value: Field.CreatedAt },
        { name: 'ความนิยม', value: Field.Popular },
        { name: 'ชื่อกระทู้', value: Field.Title },
        { name: 'หมวดหมู่', value: Field.Category },
        { name: 'ผู้แต่ง', value: Field.AuthorName },
    ]
    let ordersGroup = [ Order.DESC, Order.ASC ]

    const resetOption = () => {
        const options = sortBy.split('@')
        field = options[0] as Field
        order = options[1] as Order
        open = false
    }

    const searchData = async () => {
        sortBy = `${field}@${order}`
        open = false
    }

    $: orderName = (order: string) => {
        if (order === Order.DESC) {
            switch (field) {
                case Field.Popular: return 'มากไปน้อย';
                case Field.CreatedAt: return 'ใหม่ไปเก่า';
                default: return 'ตัวอักษร Z-A, ฮ-ก, 1-9';
            }
        }
        switch (field) {
            case Field.Popular: return 'น้อยไปมาก';
            case Field.CreatedAt: return 'เก่าไปใหม่';
            default: return 'ตัวอักษร 1-9, ก-ฮ, A-Z';
        }
    }

    const validateQuery = () => {
        if (currentPage < 1) {
            currentPage = defaultMetadata.page
        }
        if (limit < 1) {
            limit = defaultMetadata.limit
        }
        // const options = sortBy.split('@')
        // if (!Object.values(Field).includes(options[0] as Field)) {
        //     field = defaultMetadata.field
        //     sortBy = field + sortBy.substring(sortBy.indexOf('@'))
        // }
        // if (!Object.values(Order).includes(options[1] as Order)) {
        //     order = defaultMetadata.order
        //     sortBy = sortBy.substring(0, sortBy.indexOf('@')+1) + order
        // }
    }

    const fetchData = async () => {
        validateQuery()
        const res = await searchForum(searchText, sortBy, (currentPage-1)*limit, limit)
        if (res.total && !res.data.length) {
            currentPage = 1
        }
        return res
    }
</script>

<div class="mb-4">
    <Breadcrumb aria-label="SU Webboard">
        <BreadcrumbItem href="/" home>หน้าแรก</BreadcrumbItem>
        <BreadcrumbItem>กระทู้</BreadcrumbItem>
        <BreadcrumbItem>ค้นหากระทู้</BreadcrumbItem>
    </Breadcrumb>
</div>

<div class="flex justify-end">
    <Button size="lg" color="alternative" class="mb-4 w-fit whitespace-nowrap focus:!border-transparent focus:!ring-0 !bg-transparent !outline-transparent !border-transparent !p-0 !text-[var(--primary-color)] dark:!text-[var(--primary-color-75)]">
        <Chevron><div class="whitespace-nowrap">ตั้งค่าการค้นหา</div></Chevron>
    </Button>
    <Dropdown class="py-2 rounded-md bg-gray-50 dark:bg-gray-900 drop-shadow-md shadow-md min-w-[170px]" transition={slide} bind:open>
        <Helper><div class="px-2 text-sm mb-1 underline">ค้นหาโดยเรียงลำดับจาก</div></Helper>
        {#each fieldsGroup as fieldGroup}
            <Radio name="sortBy" bind:group={field} value={fieldGroup.value} class="ease-in duration-150 flex flex-start cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-600">{fieldGroup.name}</Radio>
        {/each}

        <hr class="border-gray-300 dark:border-gray-600 my-2">

        <Helper><div class="px-2 text-sm mb-1 underline">ลำดับการเรียง</div></Helper>
        {#each ordersGroup as orderGroup}
            <Radio name="order" bind:group={order} value={orderGroup} class="ease-in duration-150 flex flex-start cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-600">{orderName(orderGroup)}</Radio>
        {/each}

        <hr class="border-gray-300 dark:border-gray-600 my-2">

        <div class="w-full flex gap-x-2 px-2">
            <Button size="sm" color="red" class="w-full" gradient on:click={resetOption}>ยกเลิก</Button>
            <Button size="sm" color="green" class="w-full" gradient on:click={searchData}>ยืนยัน</Button>
        </div>
    </Dropdown>
</div>

<ForumList bind:page={currentPage} bind:limit {fetchData} bind:search={searchText} bind:sortBy />