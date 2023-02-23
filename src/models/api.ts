import type HTTP from "../commons/http"

export default interface Result<T> {
    data?: T
    status?: HTTP
    error?: ErrorResult
}

export interface TransactionResult {
    message: string
}

export interface ErrorResult {
    error: string
}
