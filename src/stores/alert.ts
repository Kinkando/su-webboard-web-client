import { writable } from "svelte/store";
import type { Alert } from "@models/alert";

const defaultAlert: Alert[] = [];

export const alerts = writable<Alert[]>(defaultAlert);

export const alert = (alert: Alert) => {
    const id = Math.floor(Math.random() * 10000);
    alert.id = id;
    alerts.update((all) => all.length >= 1 ? all : [alert]);
    setTimeout(() => dismissAlert(id), alert.timeout || 3000);
};

export const dismissAlert = (id: number) => {
    alerts.update((all) => all.filter((t) => t.id !== id));
};

export const clearAlerts = () => alerts.set(defaultAlert)