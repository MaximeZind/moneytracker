import { customFetch } from "./customFetch";

export async function getAccounts() {

    const response = await customFetch('../api/accounts', {
        method: 'GET',
        headers: {
            Accept: "application/json",
        },
    })

    const responseData = response.response.data;
    return responseData;
}