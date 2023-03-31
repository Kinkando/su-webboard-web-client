export interface Alert {
    id?: number
    message: string
    type: 'success' | 'warning' | 'error'
    dismissible?: boolean
    timeout?: number
}