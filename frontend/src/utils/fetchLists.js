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
            `https://shoppinglist-ap.onrender.com/shoppinglist/`,
            requestOptions
        );

        if (!response.ok) {
            throw new Error(`Error fetching lists: ${response.statusText}`);
        }

        const data = await response.json();
        //console.log("users lists: ", data);
        return data;
    } catch (error) {
        console.error("Error fetching users lists:", error);
    }
};
