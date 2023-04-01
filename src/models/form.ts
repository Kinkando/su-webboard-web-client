export interface Form {
    _id?: string
    schemas: Schema[]
}

export interface Schema {
    id: string
    type: string
    label: string
    placeholder: string
    value: string
    minlength?: number
    maxlength?: number
    pattern?: RegExp
    validations?: ((req: string) => string)[]
    disabled?: boolean
    error?: string
}

export enum FormType {
    create="CREATE",
    update="UPDATE",
}