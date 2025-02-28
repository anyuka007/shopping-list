export const fetchList = async (listId) => {
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
            `https://shoppinglist-ap.onrender.com/shoppinglist/${listId}`,
            requestOptions
        );

        if (!response.ok) {
            throw new Error(`Error fetching list: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("list: ", data);
        return data;
    } catch (error) {
        console.error("Error fetching  list:", error);
    }
};
