import { customFetch } from "./customFetch";

export interface LoginData {
    username: string;
    password: string;
}

export async function LoginUser(data: LoginData) {

    const response = await customFetch('../api/login', {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                },
                body: data,
            })

            const responseData = response.data;
    return {
        response: response,
        responseData: responseData,
    }
}