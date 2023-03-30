import type { Socket } from "socket.io-client";
import { writable } from "svelte/store";

// const socket = io(import.meta.env.VITE_API_HOST)
// socket.on('connect', () => console.log('connecting to socket'))

export default writable<Socket>()