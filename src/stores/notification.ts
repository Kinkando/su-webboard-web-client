import type { Notification } from "@models/notification";
import { writable } from "svelte/store";

export default writable<Notification>()