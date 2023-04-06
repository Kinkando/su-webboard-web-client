<script lang="ts">
	import HTTP from '@commons/http';
    import DeleteModal from '@components/modal/DeleteModal.svelte';
	import FormModal from '@components/modal/FormModal.svelte';
	import AdminHeader from '@components/shared/AdminHeader.svelte';
	import LoadingSpinner from '@components/spinner/LoadingSpinner.svelte';
	import Table from '@components/table/Table.svelte';
	import type { Category } from '@models/category';
	import { FormType, mapErrorForm, type Form } from '@models/form';
	import type { ActionTable, DataTable } from "@models/table";
	import { deleteCategories, getCategories, upsertCategory } from "@services/admin";
	import { alert } from '@stores/alert';

    let isLoading = false;
    let searchText = "";
    let limit = 10;
    let offset = 0;
    let total = 0;
    let categories: Category[] = []
    const columns: string[] = [
        "รหัสหมวดหมู่",
        "หมวดหมู่",
        "สี",
    ]
    const actions: ActionTable[] = [
        {
            id: 'edit-category',
            tooltip: 'แก้ไขรายการ',
            html: `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer rounded-full p-1 bg-[var(--primary-color)] text-white hover:scale-110 ease-in duration-200">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
            `,
            click(item: DataTable) {
                isOpenFormModal = true;
                title = "แก้ไขหมวดหมู่";
                formType = FormType.update;
                formData(item);
            },
        },
        {
            id: 'delete-category',
            tooltip: 'ลบรายการ',
            html: `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer rounded-full p-1 bg-[#e15e3f] text-white hover:scale-110 ease-in duration-200">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            `,
            click(item: DataTable) {
                isOpenDeleteModal = true;
                deleteItem = {...item};
            },
        },
    ]
    $: data = (() => {
        const dataTable: DataTable[] = [];
        categories?.forEach(category=> {
            dataTable.push({
                "_id": category.categoryID!.toString(),
                values: [
                    category.categoryID!.toString(),
                    category.categoryName,
                    `<div class="flex items-center">
                        <div class="w-4 h-4 mb-0.5" style="background-color: ${category.categoryHexColor}"></div>
                        <span class="ml-2">${category.categoryHexColor}</span>
                    </div>`,
                ],
            })
        })
        return dataTable
    })()

    const fetch = async(event: CustomEvent<{ page: number, searchText: string }>) => {
        searchText = event.detail.searchText
        offset = (event.detail.page > 0 ? event.detail.page-1 : 0)*limit
        await fetchCategories(offset, limit)
    }
    const fetchCategories = async(offset: number, limit: number) => {
        const res = await getCategories(searchText, offset, limit, sortBy)
        categories = res?.data || []
        total = res?.total || 0
    }

    let isOpenFormModal = false;
    let title = "";
    let form: Form;
    let formType: FormType;
    const addItemAction = () => {
        isOpenFormModal = true;
        title = "เพิ่มหมวดหมู่";
        formType = FormType.create;
        formData();
    }
    const formData = (item?: DataTable) => {
        form = {
            schemas: [
                {
                    id: 'categoryName',
                    type: "text",
                    label: "หมวดหมู่",
                    placeholder: "กรุณากรอกหมวดหมู่",
                    value: "",
                },
                {
                    id: 'categoryHexColor',
                    type: "color",
                    label: "สี",
                    placeholder: "กรุณากรอกสี",
                    value: "#000000",
                },
            ]
        }
        if(item) {
            form._id = item._id
            form.schemas[0].value = item.values[1]
            form.schemas[1].value = categories?.find(category => category?.categoryID?.toString() === item._id)?.categoryHexColor!
        }
    }
    const sumbitForm = async (event: CustomEvent<Form>) => {
        const category: Category = {
            categoryID: Number(event.detail._id),
            categoryName: event.detail.schemas[0].value.trim(),
            categoryHexColor: event.detail.schemas[1].value.trim(),
        }
        isLoading = true;
        const res = await upsertCategory(category)
        if (res.error) {
            isLoading = false;
            alert({
                type: 'error',
                message: mapErrorText(res.error?.error),
            })
        } else {
            await fetchCategories(offset, limit)
            isLoading = false;
            isOpenFormModal = false;
            alert({
                type: 'success',
                message: res.status === HTTP.StatusCreated ? 'เพิ่มรายการสำเร็จ' : `แก้ไขรายการสำเร็จ`
            })
        }
    }

    let isOpenDeleteModal = false;
    let deleteItem: DataTable;
    let selectedItems: DataTable[] = []
    const deleteAction = async() => {
        isLoading = true
        isOpenDeleteModal = false
        await deleteCategories([Number(deleteItem._id)])
        data = data.filter(item => item._id !== deleteItem._id)
        total -= 1
        alert({
            type: 'success',
            message: `ลบรายการสำเร็จ`
        })
        isLoading = false
    }
    const multiDeleteAction = async() => {
        if (selectedItems.length) {
            isLoading = true
            await deleteCategories(selectedItems.map(item => Number(item._id)))
            data = data.filter(item => !selectedItems.map(item => item._id).includes(item._id))
            total -= selectedItems.length
            selectedItems = []
            alert({
                type: 'success',
                message: `ลบรายการสำเร็จ`
            })
            isLoading = false
        }
    }

    const mapErrorText = (err: string): string => {
        if (err.includes('categoryName')) {
            form = mapErrorForm(form, {id: 'categoryName', text: 'หมวดหมู่นี้มีอยู่ในระบบแล้ว'})
            return 'หมวดหมู่นี้มีอยู่ในระบบแล้ว กรุณาลองใหม่อีกครั้ง'
        } else if (err.includes('categoryHexColor is invalid')) {
            form = mapErrorForm(form, {id: 'categoryHexColor', text: 'รูปแบบสีหมวดหมู่ไม่ถูกต้อง'})
            return 'รูปแบบสีหมวดหมู่ไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง'
        } else if (err.includes('categoryHexColor')) {
            form = mapErrorForm(form, {id: 'categoryHexColor', text: 'สีหมวดหมู่นี้ถูกใช้งานแล้ว'})
            return 'สีหมวดหมู่นี้ถูกใช้งานแล้ว กรุณาลองใหม่อีกครั้ง'
        }
        return err
    }

    let sortBy = "categoryID@ASC"
    let isFetching = false;
    const updateSortOption = async (event: CustomEvent<{ sortBy: string, orderBy: string }>) => {
        sortBy = `${mapSortBy(event.detail.sortBy)}@${event.detail.orderBy}`
        isFetching = true
        await fetchCategories(offset, limit)
        isFetching = false
    }
    const mapSortBy = (sortBy: string) => {
        switch (sortBy) {
            case 'รหัสหมวดหมู่': return "categoryID"
            case 'หมวดหมู่': return "categoryName"
            case 'สี': return "categoryHexColor"
        }
    }
</script>

<LoadingSpinner bind:isLoading />

<div class="rounded-lg shadow-md w-full h-full p-4 sm:p-6 overflow-hidden bg-white text-black dark:bg-gray-700 dark:text-white ease-in duration-200">
    <AdminHeader title="หมวดหมู่" bind:deleteItemsCount={selectedItems.length} on:add={addItemAction} on:delete={multiDeleteAction} />
    <Table
        bind:limit
        bind:total
        {columns}
        bind:data
        skeletonLoad
        multiSelect
        {actions}
        bind:selectedItems
        sortable
        sortBy="รหัสหมวดหมู่"
        orderBy={sortBy.substring(sortBy.indexOf("@")+1)}
        bind:isLoading={isFetching}
        on:fetch={fetch}
        on:sort={updateSortOption}
    />
</div>

<FormModal bind:open={isOpenFormModal} bind:title bind:form on:submit={sumbitForm} />
<DeleteModal bind:open={isOpenDeleteModal} deleteButtonName="ยืนยัน" on:delete={deleteAction} >
    คุณยืนยันที่จะ<span class="text-red-500">ลบหมวดหมู่{deleteItem?.values[0]}</span>หรือไม่?
    <div>หมายเหตุ: หลังจากลบหมวดหมู่แล้ว จะส่งผลให้กระทู้ที่มีเพียงหมวดหมู่เดียวถูกลบตามไปด้วย</div>
</DeleteModal>