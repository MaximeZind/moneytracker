import { NewTransaction, Transaction } from "@/types/global";
import { customFetch } from "./customFetch";

export async function getTransactions() {

    const response = await customFetch('/api/transactions', {
        method: 'GET',
        headers: {
            Accept: "application/json",
        },
    })

    const responseData = response.response.data;
    return responseData;
}

export async function newTransaction(data: NewTransaction) {

    console.log(data);
    
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