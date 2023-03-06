<script lang="ts">
	import DeleteModal from '@components/modal/DeleteModal.svelte';
	import FormModal from '@components/modal/FormModal.svelte';
	import AdminHeader from '@components/shared/AdminHeader.svelte';
	import Table from '@components/table/Table.svelte';
	import { FormType, type Form } from '@models/form';
	import type { ActionTable, DataTable } from "@models/table";
	import type { User } from "@models/user";
	import { getTeacher } from "@services/admin";
	import { Button } from 'flowbite-svelte';

    let limit = 10;
    let total = 0;
    let teachers: User[];
    const columns: string[] = [
        "ชื่อที่แสดง",
        "ชื่อ-นามสกุล",
        "อีเมล",
        "การเปิดเผยตัวตน",
    ]
    const actions: ActionTable[] = [
        {
            html: `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer rounded-full p-1 bg-[var(--primary-color)] text-white hover:scale-110 ease-in duration-200">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
            `,
            click(item: DataTable) {
                isOpenFormModal = true;
                title = "แก้ไขข้อมูลอาจารย์";
                formType = FormType.update;
                formData(item);
            },
        },
        {
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
        teachers?.forEach(teacher => {
            dataTable.push({
                "_id": teacher.userUUID!,
                values: [
                    teacher.userDisplayName,
                    teacher.userFullName,
                    teacher.userEmail,
                    teacher.isAnnonymous ? teacher.userDisplayName : "ไม่เปิดเผยตัวตน",
                ],
            })
        })
        return dataTable
    })()

    const fetchTeachers = async(event: CustomEvent<{ page: number }>) => {
        const res = await getTeacher((event.detail.page-1)*limit, limit)
        teachers = res.data
        total = res.total
    }

    let isOpenFormModal = false;
    let title = "";
    let form: Form;
    let formType: FormType;
    const addItemAction = () => {
        isOpenFormModal = true;
        title = "เพิ่มข้อมูลอาจารย์";
        formType = FormType.create;
        formData();
    }
    const formData = (item?: DataTable) => {
        form = {
            schemas: [
                {
                    type: "text",
                    label: "ชื่อที่แสดง",
                    placeholder: "กรุณาใส่ชื่อที่แสดง",
                    value: "",
                },
                {
                    type: "text",
                    label: "ชื่อ-นามสกุล",
                    placeholder: "กรุณาใส่ชื่อ-นามสกุล",
                    value: "",
                },
                {
                    type: "text",
                    label: "อีเมล",
                    placeholder: "กรุณาใส่อีเมล",
                    value: "",
                },
                {
                    type: "text",
                    label: "การเปิดเผยตัวตน",
                    placeholder: "กรุณาใส่การเปิดเผยตัวตน",
                    value: "",
                },
            ]
        }
        if(item) {
            form._id = item._id
            item.values.forEach((value, index) => form.schemas[index].value = value)
        }
    }
    const sumbitForm = (event: CustomEvent<Form>) => {
        if (formType === FormType.create) {
            console.log(`CREATE: ${event.detail.schemas[0].value}`)
        } else {
            console.log(`UPDATE ${event.detail._id}`)
        }
    }

    let isOpenDeleteModal = false;
    let deleteItem: DataTable;
    let selectedItems: DataTable[] = []
    const deleteAction = () => {
        console.log(`DELETE TEACHER ID: ${deleteItem._id}`)
        isOpenDeleteModal = false;
    }
    const multiDeleteAction = () => {
        if (selectedItems.length) {
            selectedItems.forEach(item => {
                console.log(`DELETE TEACHER ID: ${item._id}`)
            })
            selectedItems = [];
        }
    }
</script>

<div class="rounded-lg shadow-md w-full h-full p-4 sm:p-6 overflow-hidden bg-white text-black dark:bg-gray-700 dark:text-white ease-in duration-200">
    <AdminHeader title="อาจารย์" buttonName="เพิ่มอาจารย์" bind:deleteItemsCount={selectedItems.length} on:add={addItemAction} on:delete={multiDeleteAction} />
    <Table bind:limit bind:total {columns} bind:data skeletonLoad multiSelect on:fetch={fetchTeachers} {actions} bind:selectedItems />
</div>

<FormModal bind:open={isOpenFormModal} bind:title bind:form on:submit={sumbitForm} />
<DeleteModal bind:open={isOpenDeleteModal} content="คุณยืนยันที่จะลบข้อมูลอาจารย์{deleteItem?.values[0]}หรือไม่?" deleteButtonName="ยืนยัน" on:delete={deleteAction} />