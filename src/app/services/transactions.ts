import { NewTransaction, Transaction, UpdatedTransaction } from "@/types/global";
import { customFetch } from "./customFetch";

export async function getTransactions() {

    const response = await customFetch('api/transactions', {
        method: 'GET',
        headers: {
            Accept: "application/json",
        },
    })

    const responseData = response.response;
    return responseData;
}

export async function newTransaction(data: NewTransaction) {
    
    const response = await customFetch('/api/transactions', {
        method: 'POST',
        headers: {
            Accept: "application/json",
        },
        body: data,
    })

    const responseData = response.response;
    return responseData;
}

export async function getTransaction(data: string) {
    const response = await customFetch(`/api/transactions/${data}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
        },
    })

    const responseData = response.response;
    return responseData;
}

export async function deleteTransaction(data: string) {
    
    const response = await customFetch(`/api/transactions/${data}`, {
        method: 'DELETE',
        headers: {
            Accept: "application/json",
        },
    })

    const responseData = response.response;
    return responseData;
}

export async function updateTransaction(data: UpdatedTransaction) {
    const response = await customFetch(`/api/transactions/${data.id}`, {
        method: 'PATCH',
        headers: {
            Accept: "application/json",
        },
        body: data,
    })

    const responseData = response.response;
    return responseData;
}