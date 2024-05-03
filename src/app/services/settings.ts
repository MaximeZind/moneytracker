import { customFetch } from "./customFetch";

interface updatedSettings {
    darkMode?: boolean;
    currency?: string;
    amountGoal?: number;
    goalDate?: Date;
}
 
export async function updateSettings(data: updatedSettings) {
    const response = await customFetch(`/api/settings/`, {
        method: 'PATCH',
        headers: {
            Accept: "application/json",
        },
        body: data,
    })

    const responseData = response.response;
    return responseData;
}