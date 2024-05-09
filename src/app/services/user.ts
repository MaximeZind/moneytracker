import { customFetch } from "./customFetch";

export async function getUser() {

    const response = await customFetch('/api/user', {
        method: 'GET',
        headers: {
            Accept: "application/json",
        },
    })

    return response.response;
}

interface updatedUser {
    username?: string;
    email?: string;
}

export async function updateuser(data: updatedUser) {
    const response = await customFetch(`/api/user/`, {
        method: 'PATCH',
        headers: {
            Accept: "application/json",
        },
        body: data,
    })

    const responseData = response.response;
    return responseData;
}