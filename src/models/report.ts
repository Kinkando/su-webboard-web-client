import type { Category } from "./category"

export interface Report {
    reportUUID: string
    reportReason: string
    reportStatus: ReportStatus
    reportCode: string
    refReportCode?: string
    type: 'กระทู้' | 'ความคิดเห็น'
    createdAt: Date
    updatedAt?: Date
}

export enum ReportStatus {
    Pending = 'pending',
    Resolved = 'resolved',
    Rejected = 'rejected',
    Invalid = 'invalid',
    Closed = 'closed',
}

export interface ReportDetail {
    reportUUID: string
    categories?: Category[]
    title?: string
    description?: string
    imageURLs?: string[]
    userUUID?: string
    userDisplayName?: string
    userImageURL?: string
    createdAt: Date
    updatedAt: Date
}