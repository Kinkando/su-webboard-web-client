<script lang="ts">
	import { Pagination } from "flowbite-svelte";
	import type { LinkType } from "flowbite-svelte/types";

    export let limit: number;
    export let total: number;
    export let currentPage: number;

    let firstItem = 0;
    let lastItem = 0;
    let totalPage = 0;
    let pages: LinkType[] = [];

    $: (currentPage || total || limit) && _refreshPageLabel()

    function _refreshPageLabel() {
        totalPage = total ? Math.ceil(total/limit) : 0
        const pageTotal = genPageButton(currentPage, totalPage);
        let pageLinks: LinkType[] = [];
        pageTotal.forEach(page => {
            pageLinks.push({ name: page === 0 ? '...' : page.toString() })
        })
        pages = [...pageLinks]
        firstItem = !total ? 0 : (currentPage-1) * limit + 1;
        lastItem = Math.min(firstItem+limit-1, total);
        if(firstItem > total) {
            currentPage = 1;
            firstItem = total ? 1 : 0;
            lastItem = Math.min(firstItem+limit-1, total);
        }
    }

    function genPageButton(currentPage: number, totalPage: number): number[] {
        let pages: number[] = [];
        if (totalPage === 0) {
            return pages;
        }
        if (totalPage <= 7) {
            // PREVIOUS 1 2 3 4 5 6 7 NEXT
            for (let i=1; i<=totalPage; i++) {
                pages.push(i);
            }
        } else {
            // PREVIOUS 1 2 3 4 5 ... n NEXT
            if (currentPage < 5) {
                pages.push(1, 2, 3, 4, 5, 0, totalPage);
            }
            // PREVIOUS 1 ... n-4 n-3 n-2 n-1 n NEXT
            else if (currentPage > totalPage-4) {
                pages.push(1, 0, totalPage-4, totalPage-3, totalPage-2, totalPage-1, totalPage);
            }
            // PREVIOUS 1 ... c-1 c c+1 ... n NEXT
            else {
                pages.push(1, 0, currentPage-1, currentPage, currentPage+1, 0, totalPage);
            }
        }
        return pages
    }

    const clickPage = (e: MouseEvent) => {
        const elm = e.currentTarget as HTMLElement
        changePage(Number(elm.innerText))
    }

    const changePage = (page: number) => {
        if (!page || page > totalPage || page < 1) {
            return
        }
        currentPage = page;
    }

    $: {
        pages.forEach(page => {
            if (page.name === currentPage.toString()) {
                page.active = true;
            }
        })
    }
</script>

<div class="md:flex md:items-center md:justify-between ease-in duration-200">
    <div class="text-sm text-gray-700 dark:text-gray-400 text-center ease-in duration-200">
        แสดง <span class="font-semibold text-gray-900 dark:text-white ease-in duration-200">{firstItem}</span> ถึง
        <span class="font-semibold text-gray-900 dark:text-white ease-in duration-200">{lastItem}</span>
        จากทั้งหมด <span class="font-semibold text-gray-900 dark:text-white ease-in duration-200">{total}</span> รายการ
    </div>

    <Pagination
        class="flex flex-wrap justify-center w-full mt-3 md:mt-0"
        activeClass="ease-in duration-200 text-white border border-gray-300 bg-[var(--primary-color)] hover:bg-[var(--primary-color-75)] hover:text-black dark:border-gray-700"
        normalClass="ease-in duration-200 text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        bind:pages
        on:previous={() => changePage(currentPage-1)}
        on:next={() => changePage(currentPage+1)}
        on:click={clickPage}
    >
        <span slot="prev">ก่อนหน้า</span>
        <span slot="next">ถัดไป</span>
    </Pagination>
</div>