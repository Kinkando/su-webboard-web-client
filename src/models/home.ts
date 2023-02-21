import type { Announcement } from "./announcement";
import type { Category, CategoryDetail } from "./category";
import type { Forum } from "./forum";

export interface Home {
    announcements: Announcement[]
    popularTopics: Forum[]
    categories: CategoryDetail[]
}