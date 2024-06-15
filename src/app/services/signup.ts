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
    return response;
}