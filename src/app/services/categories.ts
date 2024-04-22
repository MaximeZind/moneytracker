import { customFetch } from "./customFetch";

export async function getCategories() {

    const response = await customFetch('/api/categories', {
        method: 'GET',
        headers: {
            Accept: "application/json",
        },
    })
    
    const responseData = response.response.data;
    return responseData;
}


export async function newCategory(data: string) {

    const response = await customFetch('/api/categories', {
        method: 'POST',
        headers: {
            Accept: "application/json",
        },
        body: {data},
    })
    
    return response;
}

export async function updateCategory(data: {name: string; id: string;}) {
    const response = await customFetch(`/api/categories/${data.id}`, {
        method: 'PATCH',
        headers: {
            Accept: "application/json",
        },
        body: data,
    })

    const responseData = response.response;
    return responseData;
}