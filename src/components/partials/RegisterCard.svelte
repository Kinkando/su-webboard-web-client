<script lang="ts">
    import type { User } from "firebase/auth";
	import { goto } from "$app/navigation";
	import FormModal from "@components/modal/FormModal.svelte";
	import LoadingSpinner from "@components/spinner/LoadingSpinner.svelte";
	import { mapErrorForm, type Form } from "@models/form";
    import { registerUser } from '@services/authen'
	import { createUserFirebase, deleteUserFirebase } from "@services/firebase";
	import { getNotiList, getUnreadNotiCount } from "@services/notification";
	import { getUserProfile } from "@services/user";
	import { alert } from '@stores/alert';
    import notificationStore from '@stores/notification'
	import userStore from '@stores/user';
	import { getUserType, setToken } from "@util/localstorage";
    import * as Pattern from '@util/pattern'
    import * as Validator from '@util/validation'
    import type { UserCredential } from 'firebase/auth'
	import { initState } from "@util/init-state";

	export let user: User;
    export let open: boolean = false;

    let isLoading = false;
    let title = "สมัครสมาชิก"
    let form: Form = {
        schemas: [
            {
                id: 'studentID',
                type: "text",
                label: "รหัสนักศึกษา",
                placeholder: "กรุณากรอกรหัสนักศึกษา",
                value: "",
                pattern: Pattern.number,
                minlength: 8,
                maxlength: 9,
            },
            {
                id: 'userDisplayName',
                type: "text",
                label: "ชื่อที่แสดงบนหน้าเว็บ",
                placeholder: "กรุณากรอกชื่อที่แสดงบนหน้าเว็บ",
                value: user.displayName || '',
                validations: [
                    Validator.notStartWithSpace,
                    Validator.notMultiSpace,
                ]
            },
            {
                id: 'userFullName',
                type: "text",
                label: "ชื่อ-นามสกุล",
                placeholder: "กรุณากรอกชื่อ-นามสกุล",
                value: user.displayName || '',
                validations: [
                    Validator.notStartWithSpace,
                    Validator.notMultiSpace,
                ]
            },
            {
                id: 'userEmail',
                type: "text",
                label: "อีเมล",
                placeholder: "กรุณากรอกอีเมล",
                value: user.email!,
                disabled: true,
                validations: [ Validator.noSpace ]
            },
            {
                id: 'password',
                type: "password",
                label: "รหัสผ่าน",
                placeholder: "กรุณากรอกรหัสผ่าน",
                value: '',
                minlength: 6,
            },
            {
                id: 'confirmPassword',
                type: "password",
                label: "ยืนยันรหัสผ่าน",
                placeholder: "กรุณากรอกรหัสผ่านอีกครั้ง",
                value: '',
                minlength: 6,
            },
        ]
    }

    const submitForm = async (event: CustomEvent<Form>) => {
        isLoading = true
        const studentID = event.detail.schemas[0].value
        const userDisplayName = event.detail.schemas[1].value
        const userFullName = event.detail.schemas[2].value
        const password = event.detail.schemas[4].value
        const confirmPassword = event.detail.schemas[5].value
        if (password !== confirmPassword) {
            mapErrorText('password mismatch')
            alert({
                type: 'error',
                message: 'รหัสผ่านไม่ตรงกัน กรุณาลองใหม่อีกครั้ง'
            })
        } else {
            let userFirebase!: UserCredential;
            try {
                userFirebase = await createUserFirebase(user.email!, password)

                if (userFirebase.user) {
                    const idToken = await userFirebase.user.getIdToken()
                    const res = await registerUser(userDisplayName, userFullName, studentID, idToken)
                    if (!res || !res.data || !res.data.accessToken || !res.data.refreshToken) {
                        alert({
                            type: 'error',
                            message: 'ไม่สามารถสมัครสมาชิกได้'
                        })
                    } else {
                        setToken(res.data.accessToken, res.data.refreshToken)
                        const { userType } = getUserType()
                        open = false;
                        alert({
                            type: 'success',
                            message: 'เข้าสู่ระบบสำเร็จ'
                        })
                        await navigate(userType)
                    }
                }
            } catch (error) {
                if(userFirebase?.user) {
                    await deleteUserFirebase(userFirebase.user)
                }
                alert({
                    type: 'error',
                    message: mapErrorText((error as any).response.data.error),
                })
            }
        }
        isLoading = false
    }

    const navigate = async(userType: string) => {
        await initState(userType as any)
        await goto("/")
    }

    const mapErrorText = (err: string): string => {
        if (err === 'password mismatch') {
            form = mapErrorForm(form, {id: 'password', text: 'รหัสผ่านไม่ตรงกัน'}, {id: 'confirmPassword', text: 'รหัสผ่านไม่ตรงกัน'})
            return 'รหัสผ่านไม่ตรงกัน กรุณาลองใหม่อีกครั้ง'
        } else if (err.includes('email')) {
            form = mapErrorForm(form, {id: 'userEmail', text: 'อีเมลนี้มีผู้อื่นใช้งานแล้ว'})
            return 'อีเมลนี้มีผู้อื่นใช้งานแล้ว กรุณาลองใหม่อีกครั้ง'
        } else if (err.includes('studentID')) {
            form = mapErrorForm(form, {id: 'studentID', text: 'รหัสนักศึกษานี้มีอยู่ในระบบแล้ว'})
            return 'รหัสนักศึกษานี้มีอยู่ในระบบแล้ว กรุณาลองใหม่อีกครั้ง'
        }
        return err
    }
</script>

<LoadingSpinner bind:isLoading />

<FormModal bind:open bind:title bind:form on:submit={submitForm} />