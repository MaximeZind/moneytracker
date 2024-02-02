export interface LoginData {
    username: string;
    password: string;
}

export async function LoginUser(data: LoginData) {

    const response = await fetch('api/login', {
        method: 'POST',
        headers: {
            Accept: "application/json",
        },
        body: JSON.stringify(data),
    });

    const responseData = await response.json();
    // Object.assign(response, {responseData: responseData})
    
    return {
        response: response,
        responseData: responseData
    }
}