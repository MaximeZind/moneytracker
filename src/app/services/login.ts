export interface LoginData {
    username: string;
    password: string;
}

export async function LoginUser(data: LoginData) {

    console.log('hi');
    
    const response = await fetch('api/login', {
        method: 'POST',
        headers: {
            Accept: "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
    }
    const responseData = response.json();
    return responseData;
}