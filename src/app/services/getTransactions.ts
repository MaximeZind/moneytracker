export async function getTransactions(token: string) {
    
    const response = await fetch('api/transactions', {
        method: 'GET',
        headers: {
            Accept: "application/json",
            'Authorization': `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
    }
    const responseData = response.json();
    return responseData;
}