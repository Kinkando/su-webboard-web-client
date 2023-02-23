export interface FormSchema {
    value: string
    label: string
    placeholder: string
}

export interface CategoryToggle {
    categoryUUID: string
    isActive: boolean
}

export interface Attachment {
    src: string
    file: File
    isLoading: boolean
}
