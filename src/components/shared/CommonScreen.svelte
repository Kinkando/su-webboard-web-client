<script lang="ts">
    export let page: 'login' | 'forgot-password' | 'reset-password';
</script>

<div id="{page}-screen" class="w-screen h-screen flex overflow-y-auto">
    <div class="w-full bg-[var(--primary-color)] px-6 max-[900px]:hidden" id="{page}-logo">
        <div class="relative top-1/2 -translate-y-1/2 overflow-y-auto">
            <img class="w-72 m-auto" src="/images/SU-WEBBOARD-ICON.png" alt="">
            <img class="w-72 m-auto" src="/images/SU-WEBBOARD-TEXT.png" alt="">
        </div>
    </div>
    <div class="w-full max-[900px]:bg-[var(--primary-color)] dark:max-[900px]:bg-gray-900 min-[901px]:bg-gray-200 dark:min-[901px]:bg-gray-900 p-4" id="{page}-panel">
        <div id="{page}-card" class="relative top-1/2 -translate-y-1/2 overflow-y-auto">
            <slot />
        </div>
    </div>
</div>

<style lang="scss">
    @media screen and (max-height: 454px) {
        #login-screen {
            height: fit-content;
            #login-logo {
                display: none;
            }
            #login-panel {
                background-color: var(--primary-color); // Must be implement for dark theme
                #login-card {
                    display: block;
                }
            }
        }
    }

    @media screen and (max-height: 298px) {
        #forgot-password-screen {
            height: fit-content;
            #forgot-password-logo {
                display: none;
            }
            #forgot-password-panel {
                background-color: var(--primary-color); // Must be implement for dark theme
                #forgot-password-card {
                    display: block;
                }
            }
        }
    }

    @media screen and (max-height: 434px) {
        #reset-password-screen {
            height: fit-content;
            #reset-password-logo {
                display: none;
            }
            #reset-password-panel {
                background-color: var(--primary-color); // Must be implement for dark theme
                #reset-password-card {
                    display: block;
                }
            }
        }
    }
</style>
