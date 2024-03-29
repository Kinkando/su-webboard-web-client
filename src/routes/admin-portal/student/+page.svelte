<script lang="ts">
	import ConfirmModal from '@components/modal/ConfirmModal.svelte';
	import DeleteModal from '@components/modal/DeleteModal.svelte';
	import FormModal from '@components/modal/FormModal.svelte';
	import AdminHeader from '@components/shared/AdminHeader.svelte';
	import LoadingSpinner from '@components/spinner/LoadingSpinner.svelte';
	import Table from '@components/table/Table.svelte';
	import { FormType, mapErrorForm, type Form } from '@models/form';
	import type { ActionTable, DataTable } from "@models/table";
	import type { User } from "@models/user";
	import { getUsers, createUser, updateUser, deleteUsers, revokeUsers } from "@services/admin";
	import { alert } from '@stores/alert';
	import { timeFormat } from '@util/datetime';
    import * as Pattern from '@util/pattern';
    import * as Validator from '@util/validation';

    let isLoading = false;
    let searchText = "";
    let limit = 10;
    let offset = 0;
    let total = 0;
    let students: User[] = [];
    const columns: string[] = [
        "รูปโปรไฟล์",
        "รหัสนักศึกษา",
        "ชื่อที่แสดงบนหน้าเว็บ",
        "ชื่อ-นามสกุล",
        "อีเมล",
        "เข้าสู่ระบบล่าสุด",
    ]
    const actions: ActionTable[] = [
        {
            id: 'edit-student',
            tooltip: 'แก้ไขรายการ',
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
            id: 'delete-student',
            tooltip: 'ลบรายการ',
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
            id: 'force-logout-student',
            tooltip: 'บังคับออกจากระบบ',
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
        students.forEach(student => {
            dataTable.push({
                "_id": student.userUUID!,
                values: [
                    `<img src=${student.userImageURL} style="min-width: 4rem; max-width: 4rem; min-height: 4rem; max-height: 4rem; border-radius: 100%">`,
                    student.studentID!,
                    student.userDisplayName!,
                    student.userFullName,
                    student.userEmail,
                    student.lastLogin ? timeFormat(student.lastLogin) : 'ยังไม่เคยเข้าสู่ระบบ'
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
        const res = await getUsers('std', searchText, offset, limit, sortBy)
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
                        id: 'studentID',
                        type: "text",
                        label: "รหัสนักศึกษา",
                        placeholder: "กรุณากรอกรหัสนักศึกษา",
                        value: item.values[1],
                        pattern: Pattern.number,
                        minLength: 8,
                        maxLength: 9,
                    },
                    {
                        id: 'userDisplayName',
                        type: "text",
                        label: "ชื่อที่แสดงบนหน้าเว็บ",
                        placeholder: "กรุณากรอกชื่อที่แสดงบนหน้าเว็บ",
                        value: item.values[2],
                        validations: [
                            Validator.notStartWithSpace,
                            Validator.notMultiSpace,
                        ],
                        minLength: 3,
                        maxLength: 50,
                    },
                    {
                        id: 'userFullName',
                        type: "text",
                        label: "ชื่อ-นามสกุล",
                        placeholder: "กรุณากรอกชื่อ-นามสกุล",
                        value: item.values[3],
                        validations: [
                            Validator.notStartWithSpace,
                            Validator.notMultiSpace,
                        ],
                        minLength: 3,
                        maxLength: 50,
                    },
                    {
                        id: 'userEmail',
                        type: "text",
                        label: "อีเมล",
                        placeholder: "กรุณากรอกอีเมล",
                        value: item.values[4],
                        validations: [ Validator.noSpace ],
                        maxLength: 100,
                    },
                ]
            }

        } else {
            form = {
                schemas: [
                    {
                        id: 'studentID',
                        type: "text",
                        label: "รหัสนักศึกษา",
                        placeholder: "กรุณากรอกรหัสนักศึกษา",
                        value: "",
                        pattern: Pattern.number,
                        minLength: 8,
                        maxLength: 9,
                    },
                    {
                        id: 'userFullName',
                        type: "text",
                        label: "ชื่อ-นามสกุล",
                        placeholder: "กรุณากรอกชื่อ-นามสกุล",
                        value: "",
                        validations: [
                            Validator.notStartWithSpace,
                            Validator.notMultiSpace,
                        ],
                        minLength: 3,
                        maxLength: 50,
                    },
                    {
                        id: 'userEmail',
                        type: "text",
                        label: "อีเมล",
                        placeholder: "กรุณากรอกอีเมล",
                        value: "",
                        validations: [ Validator.noSpace ],
                        maxLength: 100,
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
                userFullName: event.detail.schemas[1].value.trim(),
                userEmail: event.detail.schemas[2].value.trim(),
            }
            const res = await createUser(user, 'std')
            if (res.error) {
                alert({
                    type: 'error',
                    message: mapErrorText(res.error.error),
                })
            } else {
                await getStudents(offset, limit)
                isOpenFormModal = false;
                alert({
                    type: 'success',
                    message: 'เพิ่มรายการสำเร็จ'
                })
            }
        } else {
            const user: User = {
                userUUID: event.detail._id,
                studentID: event.detail.schemas[0].value,
                userDisplayName: event.detail.schemas[1].value.trim(),
                userFullName: event.detail.schemas[2].value.trim(),
                userEmail: event.detail.schemas[3].value.trim(),
            }
            const res = await updateUser(user)
            if (res.error) {
                alert({
                    type: 'error',
                    message: mapErrorText(res.error.error),
                })
            } else {
                await getStudents(offset, limit)
                isOpenFormModal = false;
                alert({
                    type: 'success',
                    message: 'แก้ไขรายการสำเร็จ'
                })
            }
        }
        isLoading = false
    }

    let isOpenDeleteModal = false;
    let selectedItem: DataTable;
    let selectedItems: DataTable[] = []
    const deleteAction = async () => {
        isLoading = true
        isOpenDeleteModal = false;
        await deleteUsers([selectedItem._id])
        await getStudents(offset, limit)
        alert({
            type: 'success',
            message: `ลบรายการสำเร็จ`
        })
        isLoading = false
    }
    const multiDeleteAction = async() => {
        if (selectedItems.length) {
            isLoading = true
            await deleteUsers(selectedItems.map(item => item._id))
            await getStudents(offset, limit)
            selectedItems = [];
            alert({
                type: 'success',
                message: `ลบรายการสำเร็จ`
            })
            isLoading = false
        }
    }

    let isOpenForceLogoutModal = false;
    const forceLogout = async() => {
        isOpenForceLogoutModal = false;
        await revokeUsers([selectedItem._id])
        alert({
            type: 'success',
            message: `บังคับนักศึกษาออกจากระบบทุกอุปกรณ์สำเร็จ`
        })
    }

    const mapErrorText = (err: string): string => {
        if (err.includes('studentID')) {
            form = mapErrorForm(form, {id: 'studentID', text: 'รหัสนักศึกษานี้มีอยู่ในระบบแล้ว'})
            return 'รหัสนักศึกษานี้มีอยู่ในระบบแล้ว กรุณาลองใหม่อีกครั้ง'
        } else if (err.includes('email: ')) {
            form = mapErrorForm(form, {id: 'userEmail', text: 'อีเมลนี้มีผู้อื่นใช้งานแล้ว'})
            return 'อีเมลนี้มีผู้อื่นใช้งานแล้ว กรุณาลองใหม่อีกครั้ง'
        } else if (err.includes('userEmail is invalid')) {
            form = mapErrorForm(form, {id: 'userEmail', text: 'รูปแบบอีเมลไม่ถูกต้อง'})
            return 'รูปแบบอีเมลไม่ถูกต้อง กรุณากรอกอีเมลใหม่อีกครั้ง'
        }
        return err
    }

    let sortBy = "studentID@ASC"
    let isFetching = false;
    const updateSortOption = async (event: CustomEvent<{ sortBy: string, orderBy: string }>) => {
        if (event.detail.sortBy === 'รูปโปรไฟล์') {
            return;
        }
        sortBy = `${mapSortBy(event.detail.sortBy)}@${event.detail.orderBy}`
        isFetching = true
        await getStudents(offset, limit)
        isFetching = false
    }
    const mapSortBy = (sortBy: string) => {
        switch (sortBy) {
            case 'รหัสนักศึกษา': return "studentID"
            case 'ชื่อที่แสดงบนหน้าเว็บ': return "userDisplayName"
            case 'ชื่อ-นามสกุล': return "userFullName"
            case 'อีเมล': return "userEmail"
            case 'เข้าสู่ระบบล่าสุด': return "lastLogin"
        }
    }
</script>

<LoadingSpinner bind:isLoading />

<div class="rounded-lg shadow-md w-full h-full p-4 sm:p-6 overflow-hidden bg-white text-black dark:bg-gray-700 dark:text-white ease-in duration-200">
    <AdminHeader title="นักศึกษา" bind:deleteItemsCount={selectedItems.length} on:add={addItemAction} on:delete={multiDeleteAction} />
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
        sortBy="รหัสนักศึกษา"
        orderBy={sortBy.substring(sortBy.indexOf("@")+1)}
        bind:isLoading={isFetching}
        on:fetch={fetchStudents}
        on:sort={updateSortOption}
    />
</div>

<FormModal bind:open={isOpenFormModal} bind:title bind:form on:submit={sumbitForm} />
<DeleteModal bind:open={isOpenDeleteModal} deleteButtonName="ยืนยัน" on:delete={deleteAction}>
    คุณยืนยันที่จะ<span class="text-red-500">ลบข้อมูลนักศึกษา {selectedItem?.values[1]} </span>หรือไม่?
    <div class="text-red-500 mt-2">หมายเหตุ: ข้อมูลที่เกี่ยวข้องกับนักศึกษาจะถูกลบทั้งหมด ดังนี้</div>
    <div class="text-red-500 text-left">1. ข้อมูลส่วนตัวของนักศึกษา</div>
    <div class="text-red-500 text-left">2. กระทู้ และความคิดเห็นทั้งหมดที่ถูกสร้างโดยนักศึกษา</div>
    <div class="text-red-500 text-left">3. การแจ้งเตือนที่เกี่ยวข้องทั้งหมด</div>
    <div class="text-red-500 text-left">4. ยอดการกดถูกใจกระทู้ และความคิดเห็น รวมถึงยอดผู้ชมของประกาศ</div>
</DeleteModal>
<ConfirmModal bind:open={isOpenForceLogoutModal} on:confirm={forceLogout} icon="logout">
    คุณยืนยันที่จะ<span class="text-red-500">บังคับนักศึกษา {selectedItem?.values[1]} ออกจากระบบ</span>หรือไม่?
</ConfirmModal>