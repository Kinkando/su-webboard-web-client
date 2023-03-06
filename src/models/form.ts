export interface Form {
    _id?: string
    schemas: Schema[]
}

export interface Schema {
    type: string
    label: string
    placeholder: string
    value: string
}

export enum FormType {
    create="CREATE",
    update="UPDATE",
}