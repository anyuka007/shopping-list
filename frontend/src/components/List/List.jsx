import "./List.css";
/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons"; */
import { Pencil, Trash2, Plus } from "lucide-react";
import ListItem from "./ListItem.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const List = () => {
    const [newItemName, setNewItemName] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const inputHandler = (event) => {
        setError("");
        setNewItemName(event.target.value);
        // console.log("new item name", newItemName);
    };

    const addNewItemHandler = () => {
        if (!newItemName) {
            setError("Please fill this field");
        } else {
            addNewItem();
        }
    };

    const addNewItem = async () => {
        const listId = "67a3c5d8fbe714bd2d27c343";
        const token = localStorage.getItem("token");
        //const listId = list._id
        if (!token) {
            navigate("/login");
            throw new Error("No token found");
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
            `http://localhost:5000/shoppinglist/${listId}`,
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

    return (
        <div className="list-container">
            <div className="list-name">
                <div>
                    <h3>Name of the list</h3>
                </div>
                <div>
                    <Pencil className="list-icon" />
                    <Trash2 className="list-icon" />
                </div>
            </div>
            <div className="list-new-item">
                <input
                    type="text"
                    placeholder="Add new item"
                    value={newItemName}
                    onChange={inputHandler}
                />
                <Plus
                    className="list-icon plus-icon"
                    onClick={addNewItemHandler}
                />
            </div>
            {error && <p className="input-validation-error">{error}</p>}
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
        </div>
    );
};

export default List;
