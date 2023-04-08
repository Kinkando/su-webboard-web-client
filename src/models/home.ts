import type { Announcement } from "./announcement";
import type { CategoryDetail } from "./category";
import type { Forum } from "./forum";
import type { ReportStatistic } from "./report";

export interface HomeUser {
    announcements: Announcement[]
    popularTopics: Forum[]
    categories: CategoryDetail[]
}

export interface HomeAdmin {
    reportStatus: ReportStatistic
    // categories: CategoryDetail[]
    forums: ForumCreated
}

interface ForumCreated {
    [date: string]: number
}