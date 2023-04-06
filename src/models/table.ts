export interface DataTable {
    _id: string
    values: string[]
}

export interface ActionTable {
    id: string
    tooltip: string
    html: string
    click: (item: DataTable) => any
    hidden?: (item: DataTable) => boolean
}