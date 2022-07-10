import { api } from "@shared/services/api";
import useSWR from "swr";

export function useFetch<Data = any, Error = any>(url: string, params?: any) {
    const { data, error, mutate } = useSWR<Data, Error>(url, async url => {
        const response = await api.get(url, params);

        return response.data;
    });

    return { data, error, mutate };
}