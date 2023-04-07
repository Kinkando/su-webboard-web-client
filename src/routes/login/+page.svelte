<script lang="ts">
	import RegisterCard from './../../components/partials/RegisterCard.svelte';
	import type { User } from 'firebase/auth';
    import { Button, Card, Label, Input, Spinner } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import HTTP from '@commons/http';
	import CommonScreen from '@components/shared/CommonScreen.svelte';
	import { verifyToken } from '@services/authen';
	import { deleteUserFirebase, signinFirebase, signInGoogle } from '@services/firebase';
    import { alert } from "@stores/alert";
	import { getUserType, setToken } from '@util/localstorage';
	import { initState } from '@util/init-state';

    let email = "";
    let password = "";
    let showPassword = false;
    let isLoading = false;
    let isRegister = false;

    $: redirect = $page.url.searchParams.get('redirect')

    const signin = async() => {
        if (!email.length || !password.length) { return }
        isLoading = true;

        const idToken = await signinFirebase(email, password);
        if (idToken) {
            await verify(idToken)
        } else {
            alert({
                type: 'error',
                message: 'ชื่อผู้ใช้หรือรหัสผ่านผิดพลาด กรุณาลองใหม่อีกครั้ง!',
            })
        }
        isLoading = false
    }

    const verify = async (idToken: string, isValidDomain?: boolean) => {
        try {
            const res = await verifyToken(idToken)
            if (res.data) {
                setToken(res.data.accessToken, res.data.refreshToken)
                const { userType } = getUserType()
                await navigate(userType)
                alert({
                    type: 'success',
                    message: 'เข้าสู่ระบบสำเร็จ!',
                })
                return "success"
            } else {
                throw new Error(res as any)
            }
        } catch (error: any) {
            if (error?.response?.status === HTTP.StatusNotFound) {
                if (!isValidDomain) {
                    alert({
                        type: 'error',
                        message: 'ขออภัย ไม่พบบัญชีนี้ในระบบ กรุณาลองใหม่อีกครั้ง!',
                    })
                }
                return "not found"
            }
            alert({
                type: 'error',
                message: 'ชื่อผู้ใช้หรือรหัสผ่านผิดพลาด กรุณาลองใหม่อีกครั้ง!',
            })
            return "error"
        }
    }

    const navigate = async(userType: string) => {
        await initState(userType as any)
        await goto(redirect && !redirect.includes("login") ? redirect : (userType === 'adm' ? "/admin-portal" : "/"))
    }

    let user: User;
    const signInWithGoogle = async () => {
        // const tempEmail = `${email}`
        // const tempPassword = `${password}`
        const userFirebase = await signInGoogle()
        if (userFirebase) {
            const isValidDomain = userFirebase.email?.endsWith(import.meta.env.VITE_EMAIL_DOMAIN)
            isLoading = true;
            // email = userFirebase.email!
            // password = '****************************************************'
            const res = await verify(await userFirebase.getIdToken(), isValidDomain)
            if (res === 'not found') {
                await deleteUserFirebase(userFirebase)
                // email = tempEmail
                // password = tempPassword
                if (isValidDomain) {
                    user = userFirebase
                    isRegister = true;
                }
            }
            isLoading = false
        }
    }
</script>

{#if isLoading}
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <Spinner color="green" size="16" />
    </div>
{/if}

{#if user}
    <RegisterCard bind:user bind:open={isRegister} />
{/if}

<CommonScreen page="login">
    <Card class="m-auto border-none">
        <h1 class="text-center text-2xl mb-4 uppercase">SU Webboard</h1>
        <Label class="space-y-2">
            <span>อีเมล</span>
            <Input
                class="placeholder-gray-300"
                type="email"
                placeholder="กรุณากรอกอีเมลของท่าน"
                bind:disabled={isLoading}
                bind:value={email}
                on:keydown={event => {
                    if (event.key === 'Enter') {
                        signin();
                    }
                }}
            ></Input>
        </Label>
        <Label class="space-y-2 mt-4">
            <span>รหัสผ่าน</span>
            <Input
                class="placeholder-gray-300"
                type={showPassword ? 'text' : 'password'}
                placeholder="กรุณากรอกรหัสผ่าน"
                size="md"
                bind:disabled={isLoading}
                bind:value={password}
                on:keydown={event => {
                    if (event.key === 'Enter') {
                        signin();
                    }
                }}
            >
                <button slot="right" on:click={() => showPassword = !showPassword} class="pointer-events-auto">
                    {#if showPassword}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {:else}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                    {/if}
                </button>
            </Input>
        </Label>

        <Button disabled={isLoading} class="my-6 !bg-white !text-black !border !border-gray-300 drop-shadow-sm hover:!bg-gray-200 ease-in duration-200" on:click={signInWithGoogle}>
            <div class="flex items-center">
                <img src="/images/google-icon.png" alt="" class="w-6 h-6">
                <span class="ml-4">Sign in with Google</span>
            </div>
        </Button>

        <Button
            type="submit"
            class="uppercase"
            color="green"
            on:click={signin}
            disabled={!email.length || !password.length || isLoading}
        >
            เข้าสู่ระบบ
        </Button>
        <a class="text-blue-800 text-sm ml-auto mt-4" href="/forgot-password">ลืมรหัสผ่าน</a>
    </Card>
</CommonScreen>