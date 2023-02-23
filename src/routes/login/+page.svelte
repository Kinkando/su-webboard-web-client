<script lang="ts">
    import { Button, Card, Label, Input } from 'flowbite-svelte';
	import Alert from '@components/alert/Alert.svelte';
	import type { Alert as AlertModel } from '@models/alert';
	import { signinFirebase } from '@services/firebase';
	import LoadingSpinner from '@components/spinner/LoadingSpinner.svelte';

    let alert: AlertModel;

    let username = "";
    let password = "";
    let showPassword = false;
    let isLoading = false;

    const signin = async() => {
        if (!username.length || !password.length) { return }
        isLoading = true;

        //////////////////// MOCK FOR LOGIN AS ADMIN ////////////////////
        if (username === "admin" && password === "admin") {
            await fetch("/api/token/verify", {
                    method: "POST",
                    body: JSON.stringify({ idToken: "admin" }),
                }
            )
            window.location.href = "/"
            isLoading = false;
            return
        }
        /////////////////////////////////////////////////////////////////

        const idToken = await signinFirebase(username, password);
        alert = {
            color: idToken ? 'green' : 'red',
            message: idToken ? 'Login successfully!' : 'Your username or password is invalid, please try again!',
        }
        await fetch("/api/token/verify", {
                method: "POST",
                body: JSON.stringify({ idToken }),
            }
        ).
        then(res => window.location.href = "/").
        finally(() => isLoading = false)
    }
</script>

<Alert bind:alert />
<LoadingSpinner bind:isLoading />

<div id="login-screen" class="w-screen h-screen flex overflow-y-auto {isLoading ? 'brightness-50': ''}">
    <div class="w-full bg-[#40826D] px-6 max-[900px]:hidden" id="login-logo">
        <div class="relative top-1/2 -translate-y-1/2 overflow-y-auto">
            <img class="w-72 m-auto" src="/images/SU-WEBBOARD-ICON.png" alt="">
            <img class="w-72 m-auto" src="/images/SU-WEBBOARD-TEXT.png" alt="">
        </div>
    </div>
    <div class="w-full max-[900px]:bg-[#40826D] min-[901px]:bg-gray-200 p-4" id="login-panel">
        <div id="login-card" class="relative top-1/2 -translate-y-1/2 overflow-y-auto">
            <Card class="m-auto">
                <h1 class="text-center text-2xl mb-4 uppercase">Login</h1>
                <Label class="space-y-2">
                    <span>Username</span>
                    <Input
                        class="placeholder-gray-300"
                        type="email"
                        placeholder="Enter your username"
                        bind:disabled={isLoading}
                        bind:value={username}
                        on:keydown={event => {
                            if (event.key === 'Enter') {
                                signin();
                            }
                        }}
                    ></Input>
                </Label>
                <Label class="space-y-2 mt-4">
                    <span>Password</span>
                    <Input
                        class="placeholder-gray-300"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
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
                <Button
                    type="submit"
                    class="mt-6 uppercase"
                    color="green"
                    on:click={signin}
                    disabled={!username.length || !password.length || isLoading}
                >
                    Confirm
                </Button>
            </Card>
        </div>
    </div>
</div>

<style lang="scss">
    @media screen and (max-height: 330px) {
        #login-screen {
            height: fit-content;
            #login-logo {
                display: none;
            }
            #login-panel {
                background-color: #40826D;
                #login-card {
                    display: block;
                }
            }
        }
    }
</style>
