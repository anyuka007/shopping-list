import { API_URL } from "./constants";
import { isTokenValid } from "./checkToken";

export  const addNewItem = async (list, logout, newItemName, setError) => {
    const token = localStorage.getItem("token");
    const listId = list._id;

    //const listId = list._id
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
            name: newItemName,
        }),
    };
    const response = await fetch(
        `${API_URL}/shoppinglist/${listId}`,
        requestOptions
    );
    const data = await response.json();
    if (
        response.status === 409 &&
        data.message === "There is already such item in list"
    ) {
        setError("There is already such item in list");
        return;
    }
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error creating list");
    }
    return data;
};


export const editItem = async (changes, list, logout, itemIndex) => {
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
        itemIndex: itemIndex,
        ...changes,
      }),
    };
    const response = await fetch(
      `${API_URL}/items/${listId}`,
      requestOptions
    );
    const data = await response.json();
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error editing list");
    }
    return data;
  };

export const deleteItem = async (list, logout, itemIndex) => {
    const token = localStorage.getItem("token");
    const listId = list._id;
    if (!token || !isTokenValid(token)) {
      logout();
    }
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        itemIndex: itemIndex,
      }),
    };
    const response = await fetch(
      `${API_URL}/items/${listId}`,
      requestOptions
    );

    const data = await response.json();
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error deleting item");
    }
    return data;
  };