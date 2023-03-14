import axios from "axios"
import type { AxiosError, AxiosRequestConfig } from "axios"

import interceptor from "./interceptor"
import http from "../commons/http"
import type { ErrorResult } from "@models/api"
import type Result from "@models/api"
import { goto } from "$app/navigation"
import type { Cookies } from "@sveltejs/kit"

const axiosController: Controller = {};

interface Controller {
    [uuid: string]: AbortController[]
}

export interface AxiosRequestCustomConfig extends AxiosRequestConfig {
    cookie?: Cookies
    signalUUID?: string
    _isRefreshing?: boolean
}

export default async function api<T>(config: AxiosRequestCustomConfig): Promise<Result<T>> {
    const controller = new AbortController();
    if (!config.signal) {
        config.signal = controller.signal;
    }

    try {
        if (config?.signalUUID) {
            if (axiosController[config.signalUUID]) {
                axiosController[config.signalUUID].forEach(ctrl => ctrl.abort())
                axiosController[config.signalUUID].length = 0;
            } else {
                axiosController[config.signalUUID] = [];
            }
            axiosController[config.signalUUID].push(controller)
        }

        let response: Result<T> = {};
        await interceptor.request<T>({ ...config })
            .then(res => {
                response.data = res.data
                response.status = res.status
            })
            .catch((err: AxiosError) => {
                if (err.response?.status === http.StatusInternalServerError) {
                    // goto("/internal-server-error");
                }
                response.status = err.response?.status
                response.error = err.response?.data as ErrorResult
            })
        return response

    } catch(error: any) {
        if (!axios.isCancel(error)) {
            const err = error as AxiosError<T>
            return Promise.reject(err.response?.data || err.response || error)
        }
        return Promise.reject(error)
    }
}