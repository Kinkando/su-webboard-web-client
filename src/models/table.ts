export interface DataTable {
    _id: string
    values: string[]
}

export interface ActionTable {
    html: string
    click: (item: DataTable) => any
}