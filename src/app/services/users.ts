export async function getUsers() {

    const response = await fetch('api/users', {
        method: 'GET',
        headers: {
            Accept: "application/json",
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
    }
    const responseData = response.json();
    return responseData;
}