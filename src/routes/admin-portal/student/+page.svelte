<script lang="ts">
	import DeleteModal from '@components/modal/DeleteModal.svelte';
	import FormModal from '@components/modal/FormModal.svelte';
	import AdminHeader from '@components/shared/AdminHeader.svelte';
	import Table from '@components/table/Table.svelte';
	import { FormType, type Form } from '@models/form';
	import type { ActionTable, DataTable } from "@models/table";
	import { StatusGroup, type User } from "@models/user";
	import { getUser, createUser, updateUser, deleteUsers } from "@services/admin";

    let isLoading = true;
    let searchText = "";
    let limit = 10;
    let offset = 0;
    let total = 0;
    let students: User[] = [];
    const columns: string[] = [
        "รหัสนักศึกษา",
        "รูปโปรไฟล์",
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
                title = "แก้ไขข้อมูลนักศึกษา";
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
        students.forEach(student => {
            dataTable.push({
                "_id": student.userUUID!,
                values: [
                    student.studentID!,
                    `<img src=${student.userImageURL} style="min-width: 4rem; max-width: 4rem; min-height: 4rem; max-height: 4rem; border-radius: 100%">`,
                    student.userDisplayName!,
                    student.userFullName,
                    student.userEmail,
                    student.isAnonymous ? "ไม่เปิดเผยตัวตน" : student.userDisplayName!,
                ],
            })
        })
        return dataTable
    })()

    const fetchStudents = async(event: CustomEvent<{ page: number, searchText: string }>) => {
        searchText = event.detail.searchText
        offset = (event.detail.page > 0 ? event.detail.page-1 : 0)*limit
        await getStudents(offset, limit)
    }
    const getStudents = async(offset: number, limit: number) => {
        const res = await getUser('std', searchText, offset, limit)
        students = res?.data || []
        total = res?.total || 0
    }

    let isOpenFormModal = false;
    let title = "";
    let form: Form;
    let formType: FormType;
    const addItemAction = () => {
        isOpenFormModal = true;
        title = "เพิ่มข้อมูลนักศึกษา";
        formType = FormType.create;
        formData();
    }
    const formData = (item?: DataTable) => {
        if (item) {
            form = {
                _id: item._id,
                schemas: [
                    {
                        type: "text",
                        label: "รหัสนักศึกษา",
                        placeholder: "กรุณาใส่ข้อมูลรหัสนักศึกษา",
                        value: item.values[0],
                    },
                    {
                        type: "text",
                        label: "ชื่อที่แสดง",
                        placeholder: "กรุณาใส่ชื่อที่แสดง",
                        value: item.values[2],
                    },
                    {
                        type: "text",
                        label: "ชื่อ-นามสกุล",
                        placeholder: "กรุณาใส่ชื่อ-นามสกุล",
                        value: item.values[3],
                    },
                    {
                        type: "text",
                        label: "อีเมล",
                        placeholder: "กรุณาใส่อีเมล",
                        value: item.values[4],
                    },
                    {
                        type: "statusToggle",
                        label: "การเปิดเผยตัวตน",
                        placeholder: "กรุณาใส่การเปิดเผยตัวตน",
                        value: item.values[5] === "ไม่เปิดเผยตัวตน" ? StatusGroup.anonymous : StatusGroup.nominate,
                    },
                ]
            }

        } else {
            form = {
                schemas: [
                    {
                        type: "text",
                        label: "รหัสนักศึกษา",
                        placeholder: "กรุณาใส่ข้อมูลรหัสนักศึกษา",
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
                ]
            }
        }
    }
    const sumbitForm = async (event: CustomEvent<Form>) => {
        isLoading = true
        if (formType === FormType.create) {
            const user: User = {
                studentID: event.detail.schemas[0].value,
                userFullName: event.detail.schemas[1].value,
                userEmail: event.detail.schemas[2].value,
            }
            await createUser(user, 'std')
        } else {
            const user: User = {
                userUUID: event.detail._id,
                studentID: event.detail.schemas[0].value,
                userDisplayName: event.detail.schemas[1].value,
                userFullName: event.detail.schemas[2].value,
                userEmail: event.detail.schemas[3].value,
                isAnonymous: event.detail.schemas[4].value === 'anonymous',
            }
            await updateUser(user)
        }
        await getStudents(offset, limit)
        isLoading = false
    }

    let isOpenDeleteModal = false;
    let deleteItem: DataTable;
    let selectedItems: DataTable[] = []
    const deleteAction = async () => {
        isLoading = true
        isOpenDeleteModal = false;
        await deleteUsers([deleteItem._id])
        await getStudents(offset, limit)
        isLoading = false
    }
    const multiDeleteAction = async() => {
        if (selectedItems.length) {
            isLoading = true
            await deleteUsers(selectedItems.map(item => item._id))
            await getStudents(offset, limit)
            selectedItems = [];
            isLoading = false
        }
    }
</script>

<div class="rounded-lg shadow-md w-full h-full p-4 sm:p-6 overflow-hidden bg-white text-black dark:bg-gray-700 dark:text-white ease-in duration-200">
    <AdminHeader title="นักศึกษา" buttonName="เพิ่มนักศึกษา" bind:deleteItemsCount={selectedItems.length} on:add={addItemAction} on:delete={multiDeleteAction} />
    <Table bind:limit bind:total {columns} bind:data bind:isLoading skeletonLoad multiSelect on:fetch={fetchStudents} {actions} bind:selectedItems />
</div>

<FormModal bind:open={isOpenFormModal} bind:title bind:form on:submit={sumbitForm} />
<DeleteModal bind:open={isOpenDeleteModal} deleteButtonName="ยืนยัน" on:delete={deleteAction}>
    คุณยืนยันที่จะ<span class="text-red-500">ลบข้อมูลนักศึกษา {deleteItem?.values[0]} </span>หรือไม่?
</DeleteModal>