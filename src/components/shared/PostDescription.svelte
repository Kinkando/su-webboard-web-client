<script lang="ts">
	import { Tooltip } from "flowbite-svelte";
	import { slide } from "svelte/transition";

    export let text: string;

    const toolbar = [
        {
            id: 'undo',
            tooltip: 'Undo',
            icon: `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
            `,
            action: () => document.execCommand('undo', false)
        },
        {
            id: 'redo',
            tooltip: 'Redo',
            icon: `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
                </svg>
            `,
            action: () => document.execCommand('redo', false)
        },
        {
            id: 'picture',
            tooltip: 'ใส่รูปภาพ',
            icon: `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
            `,
            action: () => imageInput.click()
        },
        {
            id: 'video',
            tooltip: 'ใส่วิดีโอ',
            icon: `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
                </svg>
            `,
            action: () => videoInput.click()
        },
        {
            id: 'bold',
            tooltip: 'ตัวหนา',
            icon: `
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="16" height="16" viewBox="0 0 512 512">
                    <path d="M436.96 272.029c-12.997-20.015-30.294-36.69-50.574-48.874a155.018 155.018 0 0 0 15.512-67.652C401.898 69.759 332.139 0 246.394 0H50.046v512H306.45c85.745 0 155.504-69.759 155.504-155.503 0-30.079-8.643-59.288-24.994-84.468zm-190.566-71.036H160.06v-90.979h86.334c25.083 0 45.49 20.406 45.49 45.49s-20.406 45.489-45.49 45.489zM351.94 356.497c0 25.083-20.407 45.49-45.49 45.49H160.06v-90.979h146.39c25.083-.001 45.49 20.405 45.49 45.489z" fill="#fff" />
                </svg>
            `,
            action: () => text = `<div class="font-bold">${text}</div>`
        },
        {
            id: 'italic',
            tooltip: 'ตัวเอียง',
            icon: `
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="16" height="16" viewBox="0 0 20 20" style="enable-background:new 0 0 512 512" xml:space="preserve">
                    <path d="M16 1h-6a1 1 0 0 0 0 2h1.557l-5.25 14H4a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2H8.443l5.25-14H16a1 1 0 0 0 0-2z" data-name="Layer 2" fill="#fff" />
                </svg>
            `,
            action: () => text = `<div class="italic">${text}</div>`
        },
        {
            id: 'underline',
            tooltip: 'ขีดเส้นใต้',
            icon: `
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="16" height="16" viewBox="0 0 300 300" style="enable-background:new 0 0 512 512" xml:space="preserve">
                    <path d="M230 0c-8.284 0-15 6.716-15 15v130c0 35.841-29.16 65-65.002 65-17.362 0-33.684-6.762-45.961-19.038C91.759 178.685 84.999 162.361 85 144.999V15c0-8.284-6.716-15-15-15S55 6.716 55 15v129.998c-.001 25.375 9.879 49.232 27.823 67.177 17.943 17.943 41.8 27.825 67.175 27.825C202.382 240 245 197.383 245 145V15c0-8.284-6.716-15-15-15zM230 270H70c-8.284 0-15 6.716-15 15s6.716 15 15 15h160c8.284 0 15-6.716 15-15s-6.716-15-15-15z" fill="#fff" />
                </svg>
            `,
            action: () => text = `<div class="underline">${text}</div>`
        },
        {
            id: 'strike-through',
            tooltip: 'ขีดกลาง',
            icon: `
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="16" height="16" viewBox="0 0 426 426.667" style="enable-background:new 0 0 512 512" xml:space="preserve">
                    <path d="M325.668 229.332H16.332c-8.832 0-16-7.168-16-16s7.168-16 16-16h309.336c8.832 0 16 7.168 16 16s-7.168 16-16 16zm0 0" fill="#fff" />
                    <path d="M171 426.668c-70.594 0-128-51.438-128-114.668 0-8.832 7.168-16 16-16s16 7.168 16 16c0 45.59 43.07 82.668 96 82.668S267 357.59 267 312s-43.07-82.668-96-82.668c-70.594 0-128-51.434-128-114.664C43 51.434 100.406 0 171 0s128 51.434 128 114.668c0 8.832-7.168 16-16 16s-16-7.168-16-16C267 69.078 223.93 32 171 32s-96 37.078-96 82.668 43.07 82.664 96 82.664c70.594 0 128 51.438 128 114.668s-57.406 114.668-128 114.668zm0 0" fill="#fff" />
                </svg>
            `,
            action: () => text = `<div class="line-through">${text}</div>`
        },
        {
            id: 'align-left',
            tooltip: 'ชิดซ้าย',
            icon: `
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="16" height="16" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve">
                    <path d="M3 4h18a1 1 0 0 0 0-2H3a1 1 0 0 0 0 2zM3 10h12a1 1 0 0 0 0-2H3a1 1 0 0 0 0 2zM3 16h18a1 1 0 0 0 0-2H3a1 1 0 0 0 0 2zM3 22h12a1 1 0 0 0 0-2H3a1 1 0 0 0 0 2z" fill="#fff" />
                </svg>
            `,
            action: () => text = `<div class="text-left">${text}</div>`
        },
        {
            id: 'align-center',
            tooltip: 'กึ่งกลาง',
            icon: `
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="16" height="16" viewBox="0 0 72 72" style="enable-background:new 0 0 512 512" xml:space="preserve">
                    <path d="M63 15H9c-1.7 0-3-1.3-3-3s1.3-3 3-3h54c1.7 0 3 1.3 3 3s-1.3 3-3 3zM54 31H18c-1.7 0-3-1.3-3-3s1.3-3 3-3h36c1.7 0 3 1.3 3 3s-1.3 3-3 3zM63 47H9c-1.7 0-3-1.3-3-3s1.3-3 3-3h54c1.7 0 3 1.3 3 3s-1.3 3-3 3zM54 63H18c-1.7 0-3-1.3-3-3s1.3-3 3-3h36c1.7 0 3 1.3 3 3s-1.3 3-3 3z" fill="#fff" />
                </svg>
            `,
            action: () => text = `<div class="text-center">${text}</div>`
        },
        {
            id: 'align-right',
            tooltip: 'ชิดขวา',
            icon: `
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="16" height="16" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve">
                    <path d="M21 2H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2zM21 10a1 1 0 0 0 0-2H9a1 1 0 0 0 0 2zM2 15a1 1 0 0 0 1 1h18a1 1 0 0 0 0-2H3a1 1 0 0 0-1 1zM22 21a1 1 0 0 0-1-1H9a1 1 0 0 0 0 2h12a1 1 0 0 0 1-1z" fill="#fff" />
                </svg>
            `,
            action: () => text = `<div class="text-right">${text}</div>`
        },
        {
            id: 'horizontal-line',
            tooltip: 'ตัวแบ่ง',
            icon: `
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="16" height="16" viewBox="0 0 459.313 459.314" style="enable-background:new 0 0 512 512" xml:space="preserve">
                    <path d="M459.313 229.648c0 22.201-17.992 40.199-40.205 40.199H40.181c-11.094 0-21.14-4.498-28.416-11.774C4.495 250.808 0 240.76 0 229.66c-.006-22.204 17.992-40.199 40.202-40.193h378.936c22.195.005 40.17 17.989 40.175 40.181z" fill="#fff" />
                </svg>
            `,
            action: () => {}
        },
        {
            id: 'spoiled',
            tooltip: 'สปอย',
            icon: `
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="16" height="16" viewBox="0 0 477.871 477.871" style="enable-background:new 0 0 512 512" xml:space="preserve">
                    <path d="M474.609 228.901a453.124 453.124 0 0 0-103.219-98.287l67.345-67.345c6.78-6.548 6.968-17.352.42-24.132-6.548-6.78-17.352-6.968-24.132-.42-.142.137-.282.277-.42.42l-73.574 73.506a220.702 220.702 0 0 0-102.093-27.307C109.229 85.336 7.529 223.03 3.262 228.9a17.068 17.068 0 0 0 0 20.07 453.124 453.124 0 0 0 103.219 98.287l-67.345 67.345c-6.78 6.548-6.968 17.352-.42 24.132 6.548 6.78 17.352 6.968 24.132.42.142-.137.282-.277.42-.42l73.574-73.506a220.702 220.702 0 0 0 102.093 27.307c129.707 0 231.407-137.694 235.674-143.565a17.063 17.063 0 0 0 0-20.069zm-343.313 93.593a424.95 424.95 0 0 1-92.484-83.558c25.122-30.43 106.598-119.467 200.124-119.467a180.655 180.655 0 0 1 76.612 18.773L285.92 167.87c-39.2-26.025-92.076-15.345-118.101 23.855-18.958 28.555-18.958 65.691 0 94.246l-36.523 36.523zm153.72-105.489a50.36 50.36 0 0 1 5.12 21.931c0 28.277-22.923 51.2-51.2 51.2a50.36 50.36 0 0 1-21.931-5.12l68.011-68.011zm-92.16 43.861a50.36 50.36 0 0 1-5.12-21.931c0-28.277 22.923-51.2 51.2-51.2a50.36 50.36 0 0 1 21.931 5.12l-68.011 68.011zm46.08 97.536a180.659 180.659 0 0 1-76.612-18.773l29.628-29.628c39.2 26.025 92.076 15.345 118.101-23.855 18.958-28.555 18.958-65.691 0-94.246l36.523-36.523a424.975 424.975 0 0 1 92.484 83.558c-25.123 30.431-106.599 119.467-200.124 119.467z" fill="#fff" />
                </svg>
            `,
            action: () => {}
        },
    ]

    let imageInput: HTMLInputElement;
    let images: FileList;
    $: images && addImage(...images)
    const addImage = (...files: File[]) => files.forEach(file => text += `<img src=${URL.createObjectURL(file)} alt="" />`)

    let videoInput: HTMLInputElement;
    let videos: FileList;
    $: videos && addVideo(...videos)
    const addVideo = (...files: File[]) => files.forEach(file => text += `<video src=${URL.createObjectURL(file)} type="video/mp4" controls="controls" />`)
</script>

{#each toolbar as item}
    <Tooltip triggeredBy="#{item.id}" shadow trigger="hover" placement="bottom" class="z-30 transition-colors ease-in duration-200 !bg-white !text-[var(--primary-color)] dark:!text-white dark:!bg-gray-600 text-xs !py-1 !px-2">
        <div in:slide={{duration: 200}}>
            {item.tooltip}
        </div>
    </Tooltip>
{/each}

<div class="absolute p-2 h-10 w-full mr-8">
    <div class="ease-in duration-200 flex flex-wrap gap-1 pb-2 border-b-2 dark:border-gray-800 border-gray-200">
        {#each toolbar as item}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div id={item.id} class="rounded-md p-1 bg-[var(--primary-color)] cursor-pointer text-white" on:click={item.action}>
                {@html item.icon}
            </div>
        {/each}
    </div>
</div>

<div
    id="description"
    class="ease-in duration-200 transition-colors min-h-[150px] px-2 pb-2 pt-12 max-[439px]:pt-20 max-[271px]:pt-28 bg-gray-50 dark:bg-gray-700 rounded-md outline-none border-2 dark:border-gray-700 border-gray-200 focus:border-blue-500 dark:focus:border-blue-500"
    contenteditable="true"
    bind:innerHTML={text}
/>

<input bind:this={imageInput} type="file" accept="image/*" multiple hidden bind:files={images}>
<input bind:this={videoInput} type="file" accept="video/*" multiple hidden bind:files={videos}>