import { useState } from "react";
import "./NewList.css";

const NewList = () => {
    const [listTitle, setListTitle] = useState("");
    const [error, setError] = useState("");

    const inputHandler = (event) => {
        setError("");
        setListTitle(event.target.value);
    };

    const createListHandler = async () => {
        if (!listTitle) {
            setError("Fill in this field");
        } else {
            try {
                await createList();
                console.log("List created");
            } catch (error) {
                console.error("Error creating list:", error);
                setError("Unable to create list");
            }
        }
    };

    const createList = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No token found");
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
            "http://localhost:5000/shoppinglist",
            requestOptions
        );
        if (response.status === "409") {
            setError("List with such title exists");
        } else if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error creating list");
        }
        return await response.json();
    };

    return (
        <div className="new-list-container">
            <div className="new-list-name">
                <div className="new-list-name-input-container">
                    <input
                        type="text"
                        placeholder="Name of the list"
                        onChange={inputHandler}
                    />
                    {error && <p className="form-validation-error">{error}</p>}
                </div>

                <div className="new-list-button-container">
                    <button onClick={createListHandler}>Create New List</button>
                </div>
            </div>
        </div>
    );
};

export default NewList;
