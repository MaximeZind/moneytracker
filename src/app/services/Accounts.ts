import { customFetch } from "./customFetch";

export async function getAccounts() {

    const response = await customFetch('/api/accounts', {
        method: 'GET',
        headers: {
            Accept: "application/json",
        },
    })
    
    const responseData = response.response.data;
    return responseData;
}

export async function getAccount(id: string) {
    const response = await customFetch(`/api/accounts/${id}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
        },
    })
    return response;
}

export interface AccountData {
    name: string;
    type: string;
}

export async function newAccount(data: AccountData) {

    const response = await customFetch('/api/accounts', {
        method: 'POST',
        headers: {
            Accept: "application/json",
        },
        body: data,
    })
    
    return response;
}
