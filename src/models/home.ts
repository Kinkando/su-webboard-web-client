import type { Announcement } from "./announcement";
import type { CategoryDetail } from "./category";
import type { Forum } from "./forum";

export interface Home {
    announcements: Announcement[]
    popularTopics: Forum[]
    categories: CategoryDetail[]
}