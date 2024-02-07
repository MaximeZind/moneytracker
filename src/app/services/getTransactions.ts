import { customFetch } from "./customFetch";

export async function getTransactions(token: string) {

    const response = await customFetch('../api/transactions', {
        method: 'GET',
        headers: {
            Accept: "application/json",
        },
        token: token,
    })
    
    if (response.response.status !== 200) {
        const errorData = response.response.message;
        throw new Error(errorData || 'Something went wrong');
    }

    const responseData = response.response.data;
    return responseData;
}