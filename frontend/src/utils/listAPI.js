import { API_URL } from "./constants";
import { isTokenValid } from "./checkToken";

export const createList = async (logout, listTitle, setError) => {
    const token = localStorage.getItem("token");
    if (!token || !isTokenValid(token)) {
        logout();
    }
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            title: listTitle,
        }),
    };
    const response = await fetch(
        `${API_URL}/shoppinglist`,
        requestOptions
    );
    const data = await response.json();
    if (
        response.status === 409 &&
        data.message === "List with such title already exists"
    ) {
        setError("List with such title exists");
        return;
    } 
    if (!response.ok) {
        throw new Error(data.message || "Error creating list");
    }        
    return await data;
};


export const editListName = async (list, listName, logout) => {
    const token = localStorage.getItem("token");

        const listId = list._id;
        if (!token || !isTokenValid(token)) {
            logout();
        }
        const requestOptions = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                newName: listName,
            }),
        };
        const response = await fetch(
            `${API_URL}/shoppinglist/${listId}`,
            requestOptions
        );
        const data = await response.json();
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error deleting list");
        }
        return data;
    };

export const deleteList = async (list, logout) => {
    const token = localStorage.getItem("token");
        const listId = list._id;
        if (!token || !isTokenValid(token)) {
            logout();
        }
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(
            `${API_URL}/shoppinglist/${listId}`,
            requestOptions
        );
        const data = await response.json();
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error deleting list");
        }
        return data;
    };
