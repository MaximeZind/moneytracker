import { customFetch } from "./customFetch";

export async function getTransactions() {

    const response = await customFetch('../api/transactions', {
        method: 'GET',
        headers: {
            Accept: "application/json",
        },
    })

    const responseData = response.response.data;
    return responseData;
}