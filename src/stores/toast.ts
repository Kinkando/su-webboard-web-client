import { writable } from "svelte/store";
import type { NotificationToast } from "@models/toast";

const defaultToast: NotificationToast[] = [];

export const toasts = writable<NotificationToast[]>(defaultToast);

export const pushNotification = (toast: NotificationToast) => {
    const id = Math.floor(Math.random() * 10000);
    toast.id = id;
    toasts.update((all) => [toast, ...all]);
    setTimeout(() => dismissToast(id), toast.timeout || 6000);
}

export const dismissToast = (id?: number) => {
    toasts.update((all) => all.filter((t) => t.id !== id));
};

export const clearToasts = () => toasts.set(defaultToast)