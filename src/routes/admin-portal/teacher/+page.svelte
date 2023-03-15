<script lang="ts">
	import ConfirmModal from '@components/modal/ConfirmModal.svelte';
	import DeleteModal from '@components/modal/DeleteModal.svelte';
	import FormModal from '@components/modal/FormModal.svelte';
	import AdminHeader from '@components/shared/AdminHeader.svelte';
	import Table from '@components/table/Table.svelte';
	import { FormType, type Form } from '@models/form';
	import type { ActionTable, DataTable } from "@models/table";
	import { StatusGroup, type User } from "@models/user";
	import { getUser, createUser, updateUser, deleteUsers, revokeUsers } from "@services/admin";

    let searchText = "";
    let isLoading = true;
    let limit = 10;
    let offset = 0;
    let total = 0;
    let teachers: User[] = [];
    const columns: string[] = [
        "รูปโปรไฟล์",
        "ชื่อที่แสดง",
        "ชื่อ-นามสกุล",
        "อีเมล",
        "การเปิดเผยตัวตน",
        "เข้าสู่ระบบล่าสุด",
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
                selectedItem = {...item};
            },
        },
        {
            html: `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer rounded-full p-1 bg-purple-400 text-white hover:scale-110 ease-in duration-200">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
            `,
            click(item: DataTable) {
                isOpenForceLogoutModal = true;
                selectedItem = {...item};
            },
        },
    ]
    $: data = (() => {
        const dataTable: DataTable[] = [];
        teachers.forEach(teacher => {
            dataTable.push({
                "_id": teacher.userUUID!,
                values: [
                    `<img src=${teacher.userImageURL} style="min-width: 4rem; max-width: 4rem; min-height: 4rem; max-height: 4rem; border-radius: 100%">`,
                    teacher.userDisplayName!,
                    teacher.userFullName,
                    teacher.userEmail,
                    teacher.isAnonymous ? "ไม่เปิดเผยตัวตน" : teacher.userDisplayName!,
                    teacher.lastLogin ? new Date(teacher.lastLogin).toLocaleString('th', { year: 'numeric', month: 'narrow', day: '2-digit', hour12: false, hour: '2-digit', minute: '2-digit' }) : 'ยังไม่เคยเข้าสู่ระบบ'
                ],
            })
        })
        return dataTable
    })()

    const fetchTeachers = async(event: CustomEvent<{ page: number, searchText: string }>) => {
        searchText = event.detail.searchText
        offset = (event.detail.page > 0 ? event.detail.page-1 : 0)*limit
        await getTeachers(offset, limit)
    }
    const getTeachers = async(offset: number, limit: number) => {
        const res = await getUser('tch', searchText, offset, limit)
        teachers = res?.data || []
        total = res?.total || 0
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
        if(item) {
            form = {
                _id: item._id,
                schemas: [
                    {
                        type: "text",
                        label: "ชื่อที่แสดง",
                        placeholder: "กรุณาใส่ชื่อที่แสดง",
                        value: item.values[1],
                    },
                    {
                        type: "text",
                        label: "ชื่อ-นามสกุล",
                        placeholder: "กรุณาใส่ชื่อ-นามสกุล",
                        value: item.values[2],
                    },
                    {
                        type: "text",
                        label: "อีเมล",
                        placeholder: "กรุณาใส่อีเมล",
                        value: item.values[3],
                    },
                    {
                        type: "statusToggle",
                        label: "การเปิดเผยตัวตน",
                        placeholder: "กรุณาใส่การเปิดเผยตัวตน",
                        value: item.values[4] === "ไม่เปิดเผยตัวตน" ? StatusGroup.anonymous : StatusGroup.nominate,
                    },
                ]
            }

        } else {
            form = {
                schemas: [
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
    const sumbitForm = async(event: CustomEvent<Form>) => {
        isLoading = true
        if (formType === FormType.create) {
            const user: User = {
                userFullName: event.detail.schemas[0].value,
                userEmail: event.detail.schemas[1].value,
            }
            await createUser(user, 'tch')
        } else {
            const user: User = {
                userUUID: event.detail._id,
                userDisplayName: event.detail.schemas[0].value,
                userFullName: event.detail.schemas[1].value,
                userEmail: event.detail.schemas[2].value,
                isAnonymous: event.detail.schemas[3].value === 'anonymous',
            }
            await updateUser(user)
        }
        await getTeachers(offset, limit)
        isLoading = false
    }

    let isOpenDeleteModal = false;
    let selectedItem: DataTable;
    let selectedItems: DataTable[] = []
    const deleteAction = async () => {
        isLoading = true
        isOpenDeleteModal = false;
        await deleteUsers([selectedItem._id])
        data = data.filter(item => item._id !== selectedItem._id)
        total -= 1
        isLoading = false
    }
    const multiDeleteAction = async() => {
        if (selectedItems.length) {
            isLoading = true
            await deleteUsers(selectedItems.map(item => item._id))
            data = data.filter(item => !selectedItems.map(selectedItem => selectedItem._id).includes(item._id))
            total -= selectedItems.length
            selectedItems = [];
            isLoading = false
        }
    }

    let isOpenForceLogoutModal = false;
    const forceLogout = async() => {
        isOpenForceLogoutModal = false;
        await revokeUsers([selectedItem._id])
    }
</script>

<div class="rounded-lg shadow-md w-full h-full p-4 sm:p-6 overflow-hidden bg-white text-black dark:bg-gray-700 dark:text-white ease-in duration-200">
    <AdminHeader title="อาจารย์" buttonName="เพิ่มอาจารย์" bind:deleteItemsCount={selectedItems.length} on:add={addItemAction} on:delete={multiDeleteAction} />
    <Table bind:limit bind:total {columns} bind:data bind:isLoading skeletonLoad multiSelect on:fetch={fetchTeachers} {actions} bind:selectedItems />
</div>

<FormModal bind:open={isOpenFormModal} bind:title bind:form on:submit={sumbitForm} />
<DeleteModal bind:open={isOpenDeleteModal} deleteButtonName="ยืนยัน" on:delete={deleteAction} >
    คุณยืนยันที่จะ<span class="text-red-500">ลบข้อมูลอาจารย์ {selectedItem?.values[1]} </span>หรือไม่?
</DeleteModal>
<ConfirmModal bind:open={isOpenForceLogoutModal} on:confirm={forceLogout} icon="logout">
    คุณยืนยันที่จะ<span class="text-red-500">บังคับอาจารย์ {selectedItem?.values[1]} ออกจากระบบ</span>หรือไม่?
</ConfirmModal>