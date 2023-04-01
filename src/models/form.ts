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
    isShow?: boolean
}

export enum FormType {
    create="CREATE",
    update="UPDATE",
}

export const mapErrorForm = (form: Form, ...errors: {id: string, text: string}[]) => {
    form.schemas.forEach((schema, index) => {
        const idx = errors.findIndex(error => error.id === schema.id)
        form.schemas[index].error = idx !== -1 ? errors[idx].text : ''
    })
    return form
}