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
            "http://localhost:5000/login",
            requestOptions
        );
        const data = await response.json();
        if (response.status === 401 && data.message === "Invalid credentials") {
            alert("Invalid password");
        } else if (
            response.status === 404 &&
            data.message === "User not found"
        ) {
            alert("User not found");
        } else if (!response.ok) {
            throw new Error("Error by login user");
        } else {
            console.log("User is logged", data);
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.firstName);
            // navigate("/");
        }
    } catch (error) {
        console.error("There was a problem with login user:", error);
    }
};
