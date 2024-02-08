import { redirect } from "next/navigation";
import { useRouter } from 'next/router';

export async function customFetch(url: string, options: {
    method: string;
    headers?: { [key: string]: string };
    body?: object;
    token?: string;
}) {
    const defaultHeaders: { [key: string]: string } = {
        Accept: 'application/json',
    };

    if (options.token) {
        defaultHeaders['Authorization'] = `Bearer ${options.token}`;
        // const router = useRouter();
        if (isTokenExpired(options.token)) {
            // console.log('Token expired');
            // localStorage.removeItem('token');
            // router.push('/login');
        }
        // if (isTokenExpired(options.token)) {
        //     console.log('expired');
        //     localStorage.removeItem('token');
        //     return redirect('/login');
        // }
    }

    // Prepare the headers
    const headers = {
        ...defaultHeaders,
        ...options.headers,
    };

    // Prepare the body, if applicable and necessary
    let body;
    if (options.body && (options.method === "POST" || options.method === "PUT" || options.method === "PATCH")) {
        body = JSON.stringify(options.body);
        headers['Content-Type'] = 'application/json'; // Ensure to set the Content-Type for JSON
    }

    // Construct the fetch options
    const fetchOptions: RequestInit = {
        method: options.method,
        headers,
        ...(body && { body }), // Only add body if it's defined
    };

    try {
        const response = await fetch(url, fetchOptions);
        const res = await response.json();
        console.log(res);
        return res;
    } catch (error) {
        console.log("customFetch error: " + error);
        throw error;
    }
}

function isTokenExpired(token: string) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Date.now() / 1000; // Convert to seconds
    return payload.exp < now;
}