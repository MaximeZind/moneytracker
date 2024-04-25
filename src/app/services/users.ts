// export async function getUsers() {

import { customFetch } from "./customFetch";

//     const response = await fetch('localhost:3000/api/users', {
//         method: 'GET',
//         headers: {
//             Accept: "application/json",
//         },
//     });

//     // if (!response.ok) {
//     //     const errorData = await response.json();
//     //     throw new Error(errorData.error || 'Something went wrong');
//     // }
//     // const responseData = response.json();
//     // return responseData;
//     return response;
// }

export async function getUsers() {

    const response = await customFetch('api/users', {
        method: 'GET',
        headers: {
            Accept: "application/json",
        },
    })

    const responseData = response.response;
    return responseData;
}