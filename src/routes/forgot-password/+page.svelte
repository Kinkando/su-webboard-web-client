<script lang="ts">
	import CommonScreen from '@components/shared/CommonScreen.svelte';
	import { sendResetPassword } from '@services/firebase';
    import { Button, Card, Label, Input } from 'flowbite-svelte';

    let email = ""
    let countdown = 0;

    const forgotPassword = () => {
        countdown = 60;
        const countdownResetPassword = setInterval(() => {
            countdown--;
            if (countdown === 0) {
                clearInterval(countdownResetPassword)
            }
        }, 1000)
        sendResetPassword(email)
    }
    const isEmail = () => {
        const regex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        return regex.test(email)
    }
</script>

<CommonScreen page="forgot-password">
    <Card class="m-auto border-none">
        <h1 class="text-center text-2xl mb-4 uppercase">ลืมรหัสผ่าน</h1>
        <Label class="space-y-2">
            <span>อีเมล</span>
            <Input
                class="placeholder-gray-300"
                type="email"
                placeholder="กรุณากรอกอีเมลของท่าน"
                bind:value={email}
                on:keydown={event => {
                    if (event.key === 'Enter') {
                        forgotPassword();
                    }
                }}
            ></Input>
        </Label>
        <Button
            type="submit"
            class="mt-6 uppercase"
            color="green"
            on:click={forgotPassword}
            disabled={!email || !isEmail() || countdown > 0}
        >
            {countdown > 0 ? `รอ ${countdown} วินาที` : 'ส่ง'}
        </Button>
        <a class="text-blue-800 text-sm ml-auto mt-4" href="/login">เข้าสู่ระบบ</a>
    </Card>
</CommonScreen>
