import { API_URL } from "./constants";

export const fetchUsersLists = async () => {
    const token = localStorage.getItem("token");
    try {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(
            `${API_URL}/shoppinglist/`,
            requestOptions
        );

        if (!response.ok) {
            throw new Error(`Error fetching lists: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching users lists:", error);
    }
};
