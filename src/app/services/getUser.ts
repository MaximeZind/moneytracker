import { customFetch } from "./customFetch";

export async function getUser() {

    const response = await customFetch('../api/user', {
        method: 'GET',
        headers: {
            Accept: "application/json",
        },
    })

    return response.response;
}