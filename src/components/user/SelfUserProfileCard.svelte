<script lang="ts">
	import { Label, Input, Button } from "flowbite-svelte";
	import { onMount } from "svelte";
	import LoadingSpinner from '@components/spinner/LoadingSpinner.svelte';
	import { StatusGroup, type User } from "@models/user";
	import { changePassword } from '@services/firebase';
	import { updateUserProfile } from "@services/user";
    import { alert } from "@stores/alert";
	import userStore from '@stores/user';
	import { getUserType } from "@util/localstorage";

    export let user!: User;

    let isLoading = false;
    let mode: 'view' | 'update-profile' | 'change-password' = 'view';
    let draft: any;
    let statusGroup: string;

    interface PasswordOption {
        value: string
        label: string
        placeholder: string
        isShowPassword: boolean
    }

    interface Password {
        [key: string]: PasswordOption
    }

    let password: Password = {
        old: {
            value: "",
            label: "รหัสผ่านเดิม",
            placeholder: "กรุณากรอกรหัสผ่านเดิมของท่าน",
            isShowPassword: false,
        },
        new: {
            value: "",
            label: "รหัสผ่านใหม่",
            placeholder: "กรุณากรอกรหัสผ่านใหม่ของท่าน",
            isShowPassword: false,
        },
        confirm: {
            value: "",
            label: "ยืนยันรหัสผ่านใหม่",
            placeholder: "กรุณากรอกยืนยันรหัสผ่านใหม่ของท่าน",
            isShowPassword: false,
        },
    }

    let image: File | undefined

    let files: FileList;
    let fileInput: HTMLInputElement;
    $: files && updateProfileImage()
    const updateProfileImage = () => {
        if (files?.length) {
            draft.userImageURL = URL.createObjectURL(files[0])
            image = files[0]
        }
    }

    onMount(async () => {
        draft = {...user}
    })

    const updateProfile = async () => {
        isLoading = true;
        const res = await updateUserProfile(draft.userDisplayName, statusGroup === StatusGroup.anonymous, image)
        if (res?.data) {
            alert({
                type: 'success',
                message: 'อัพเดตข้อมูลส่วนตัวสำเร็จ',
            })

            // update local
            image = undefined;
            user.userDisplayName = draft.userDisplayName.trim();
            user.userImageURL = draft.userImageURL;
            userStore.set(user)
            mode = 'view'
        } else {
            alert({
                type: 'error',
                message: 'เกิดข้อผิดพลาดบางอย่าง กรุณาลองใหม่อีกครั้ง',
            })
        }

        isLoading = false;
    }

    const changePass = async () => {
        if (password.old.value.length >= 6 && password.new.value.length >= 6 && password.new.value === password.confirm.value) {
            isLoading = true
            const isSuccess = await changePassword(user.userEmail, password.old.value, password.new.value)
            if (isSuccess) {
                mode = 'view'
            }
            alert({
                type: isSuccess ? 'success' : 'error',
                message: isSuccess ? 'เปลี่ยนรหัสผ่านสำเร็จ' : 'รหัสผ่านเดิมของคุณผิดพลาด กรุณาลองใหม่อีกครั้ง!',
            })
            isLoading = false
        }
    }

    const clear = () => {
        draft = {...user}
        Object.keys(password).forEach(type => {
            password[type].value = "";
            password[type].isShowPassword = false;
        })
    }

    $: mode && clear()

    const inputs = [
        {
            label: "ชื่อที่แสดงบนหน้าเว็บ",
            placeholder: "กรุณากรอกชื่อที่แสดงบนหน้าเว็บ",
            key: "userDisplayName",
        },
        {
            label: "ชื่อ-นามสกุล",
            placeholder: "",
            key: "userFullName",
        },
        {
            label: "อีเมล",
            placeholder: "",
            key: "userEmail",
        },
    ]

    const { userType } = getUserType()
    if (userType === 'std') {
        inputs.push({
            label: "รหัสนักศึกษา",
            placeholder: "",
            key: "studentID",
        })
    }
</script>

<LoadingSpinner bind:isLoading />

<div class="ease-in duration-200 bg-white dark:bg-gray-900 w-full rounded-md shadow-lg p-4 sm:p-6 max-w-4xl m-auto">
    <div class="md:flex md:items-start md:gap-x-6">
        <figure class="w-fit h-fit cursor-pointer m-auto relative">
            <img
                alt=""
                class="rounded-full min-w-[225px] min-h-[225px] max-w-[225px] max-h-[225px]"
                src="{mode === 'update-profile' ? draft?.userImageURL : user.userImageURL}"
            />

            {#if mode === 'update-profile'}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="absolute bottom-4 right-4 rounded-full p-2 bg-[var(--primary-color)] text-white border-2 dark:border-gray-900 ease-in duration-200 cursor-pointer" on:click={() => fileInput.click()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </svg>
                    <input bind:this={fileInput} type="file" accept="image/*" hidden bind:files>
                </div>
            {/if}
        </figure>

        <div class="space-y-4 w-full md:mt-0 my-6">
            {#if mode !== 'change-password'}
                {#each inputs as input}
                    <Label for={input?.label} class="space-y-2 text-black dark:text-white">
                        <span>{input?.label}</span>
                        {#if mode === 'update-profile' && input?.placeholder}
                            <Input type="text" id="title" class="ease-in duration-200 placeholder-gray-300" placeholder={input?.placeholder} required bind:value={draft[input?.key]} />
                        {:else}
                            <div class="py-2.5 text-gray-400 dark:text-gray-600 border border-transparent break-all">{draft[input?.key]}</div>
                        {/if}
                    </Label>
                {/each}
            {:else}
                {#each Object.keys(password) as type}
                    <Label class="space-y-2">
                        <span>{password[type].label}</span>
                        <Input
                            class="placeholder-gray-300"
                            type={password[type].isShowPassword ? 'text' : 'password'}
                            placeholder={password[type].placeholder}
                            size="md"
                            bind:value={password[type].value}
                            on:keydown={event => {
                                if (event.key === 'Enter') {
                                    changePass();
                                }
                            }}
                        >
                            <button slot="right" on:click={() => password[type].isShowPassword = !password[type].isShowPassword} class="pointer-events-auto">
                                {#if password[type].isShowPassword}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                {:else}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                                {/if}
                            </button>
                        </Input>
                    </Label>
                {/each}
            {/if}
        </div>
    </div>

    <div class="flex gap-x-4 justify-end">
        {#if mode === 'view'}
            <Button color="pinkToOrange" gradient class="md:w-fit w-full whitespace-nowrap" type="button" on:click={() => mode = 'change-password'}>เปลี่ยนรหัสผ่าน</Button>
            <Button color="cyanToBlue" gradient class="md:w-fit w-full whitespace-nowrap" type="button" on:click={() => mode = 'update-profile'}>แก้ไขข้อมูลส่วนตัว</Button>
        {:else}
            <Button color="red" gradient class="md:w-fit w-full whitespace-nowrap" type="reset" on:click={() => mode = 'view'}>ยกเลิก</Button>
            <Button
                color="green"
                gradient
                class="md:w-fit w-full whitespace-nowrap"
                disabled={(draft.userDisplayName.length < 6 && mode === 'update-profile') || ((password.old.value.length < 6 || password.new.value.length < 6 || password.new.value !== password.confirm.value) && mode === 'change-password')}
                type="submit"
                on:click={mode === 'update-profile' ? updateProfile : changePass}
            >
                ยืนยัน
            </Button>
        {/if}
    </div>
</div>