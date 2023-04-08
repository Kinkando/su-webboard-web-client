export interface FormSchema {
    value: string
    label: string
    placeholder: string
    maxLength: number
}

export interface Attachment {
    uuid?: string
    src: string
    file: File
    isLoading: boolean
}
