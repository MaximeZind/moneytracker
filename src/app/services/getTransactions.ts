import { customFetch } from "./customFetch";

export async function getTransactions(token: string) {

    const response = await customFetch('../api/transactions', {
        method: 'GET',
        headers: {
            Accept: "application/json",
        },
        token: token,
    })
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
    }
    const responseData = response.json();
    return responseData;
}