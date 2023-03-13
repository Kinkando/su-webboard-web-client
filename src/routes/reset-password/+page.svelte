<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import CommonScreen from '@components/shared/CommonScreen.svelte';
	import { resetPassword } from '@services/firebase';
    import { Button, Card, Label, Input } from 'flowbite-svelte';

    export let data: { email: string };
    let password = "";
    let confirmPassword = "";

    $: oobCode = $page.url.searchParams.get('oobCode')!

    const resetPass = async () => {
        if (password === confirmPassword) {
            await resetPassword(oobCode, password)
            goto('/login')
        }
    }

    let isShowPassword = false
    let isShowConfirmPassword = false
</script>

<CommonScreen page="reset-password">
    <Card class="m-auto border-none">
        <h1 class="text-center text-2xl mb-4 uppercase">รีเซ็ตรหัสผ่าน</h1>
        <Label class="space-y-2">
            <span>อีเมล</span>
            <Input
                class="placeholder-gray-300"
                type="email"
                placeholder="กรุณากรอกอีเมลของท่าน"
                disabled
                value={data.email}
            />
        </Label>
        <Label class="space-y-2 mt-4">
            <span>รหัสผ่าน</span>
            <Input
                class="placeholder-gray-300"
                type={isShowPassword ? 'text' : 'password'}
                placeholder="กรุณากรอกรหัสผ่าน"
                size="md"
                bind:value={password}
                on:keydown={event => {
                    if (event.key === 'Enter') {
                        resetPass();
                    }
                }}
            >
                <button slot="right" on:click={() => isShowPassword = !isShowPassword} class="pointer-events-auto">
                    {#if isShowPassword}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {:else}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                    {/if}
                </button>
            </Input>
        </Label>
        <Label class="space-y-2 mt-4">
            <span>ยืนยันรหัสผ่าน</span>
            <Input
                class="placeholder-gray-300"
                type={isShowConfirmPassword ? 'text' : 'password'}
                placeholder="กรุณากรอกรหัสผ่านอีกครั้ง"
                size="md"
                bind:value={confirmPassword}
                on:keydown={event => {
                    if (event.key === 'Enter') {
                        resetPass();
                    }
                }}
            >
                <button slot="right" on:click={() => isShowConfirmPassword = !isShowConfirmPassword} class="pointer-events-auto">
                    {#if isShowConfirmPassword}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {:else}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                    {/if}
                </button>
            </Input>
        </Label>
        <Button
            type="submit"
            class="mt-6 uppercase"
            color="green"
            on:click={resetPass}
            disabled={password.length < 6 || password !== confirmPassword}
        >
            ยืนยัน
        </Button>
    </Card>
</CommonScreen>
