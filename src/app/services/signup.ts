import { customFetch } from "./customFetch";

export interface SignUpData {
    username: string;
    email: string;
    password: string;
}

export async function signUpUser(data: SignUpData) {

    const response = await customFetch('/api/signup', {
        method: 'POST',
        headers: {
            Accept: "application/json",
        },
        body: data,
    })

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
    }
    const responseData = response.json();
    return responseData;
}