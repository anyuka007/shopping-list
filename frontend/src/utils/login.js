import { API_URL } from "./constants";

export const loginUser = async (email, password) => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    };
    try {
        const response = await fetch(
            `${API_URL}login`,
            requestOptions
        );
        const data = await response.json();
        let error = "";
        if (response.status === 401 && data.message === "Invalid credentials") {
            error = "Invalid password";
        } else if (
            response.status === 404 &&
            data.message === "User not found"
        ) {
            error = "User not found";
        } else if (!response.ok) {
            throw new Error("Error by login user");
        } else {
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.firstName);
        }
        return error;
    } catch (error) {
        console.error("There was a problem with login user:", error);
    }
};
