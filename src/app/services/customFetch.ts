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
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
