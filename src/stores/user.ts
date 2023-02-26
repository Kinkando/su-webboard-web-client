import type { User } from '@models/user';
import { writable } from 'svelte/store';

export default writable<User>()