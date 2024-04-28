import { customFetch } from "./customFetch";

export interface SignUpData {
    username: string;
    email: string;
    password: string;
}

export async function signOut() {

    const response = await customFetch('/api/signout', {
        method: 'DELETE',
        headers: {
            Accept: "application/json",
        },
    })

    return response;
}