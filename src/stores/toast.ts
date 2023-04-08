import { writable } from "svelte/store";
import type { NotificationToast } from "@models/toast";

const defaultToast: NotificationToast[] = [];

export const toasts = writable<NotificationToast[]>(defaultToast);

let total = 0;
toasts.subscribe(notifications => total = notifications.length)

export const pushNotification = (toast: NotificationToast) => {
    const id = Math.floor(Math.random() * 10000);
    toast.id = id;
    // toasts.update((all) => [toast, ...all]);
    // setTimeout(() => dismissToast(id), toast.timeout || 6000);
    setTimeout(async() => {
        await new Promise(resolve => {
            const loopOnce = setInterval(async () => {
                if (total === 0) {
                    await new Promise(resolve => setTimeout(() => resolve(""), 500))
                    if (total === 0) {
                        clearInterval(loopOnce)
                        resolve("")
                    }
                }
            }, 100)
        })
        toasts.update((all) => [toast, ...all]);
        setTimeout(() => dismissToast(id), toast.timeout || 2000)
    })
}

export const dismissToast = (id?: number) => {
    toasts.update((all) => all.filter((t) => t.id !== id));
};

export const clearToasts = () => toasts.set(defaultToast)