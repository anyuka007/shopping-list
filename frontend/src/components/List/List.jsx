import "./List.css";
/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons"; */
import { Pencil, Trash2, Plus } from "lucide-react";
import ListItem from "./ListItem.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUsersLists } from "../../utils/fetchLists.js";
import { isTokenValid } from "../../utils/checkToken.js";

const List = ({ list, setUserLists }) => {
    const [newItemName, setNewItemName] = useState("");
    const [error, setError] = useState("");
    const [isChecked, setIsChecked] = useState({});
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const deleteHandler = async () => {
        console.log("list is deleted");
        await deleteList();
        const updatedLists = await fetchUsersLists();
        setUserLists(updatedLists);
    };

    const deleteList = async () => {
        const listId = list._id;
        if (!token || !isTokenValid(token)) {
            navigate("/login");
            throw new Error("No token found");
        }
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(
            `http://localhost:5000/shoppinglist/${listId}`,
            requestOptions
        );
        const data = await response.json();
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error deleting list");
        }
        return data;
    };

    const inputHandler = (event) => {
        setError("");
        setNewItemName(event.target.value);
        // console.log("new item name", newItemName);
    };

    const addNewItemHandler = async () => {
        if (!newItemName) {
            setError("Please fill this field");
        } else {
            await addNewItem();
            const updatedLists = await fetchUsersLists();
            setNewItemName("");
            setUserLists(updatedLists);
        }
    };

    const addNewItem = async () => {
        const listId = list._id;

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

    const checkItemHandler = (item, itemIndex) => {
        console.log("list.title", list.title);
        console.log("item", item);
        console.log("itemIndex", itemIndex);
    };

    return (
        <div className="list-container">
            <div className="list-name">
                <div>
                    <h3>{list.title}</h3>
                </div>
                <div>
                    <Pencil className="list-icon" />
                    <Trash2 className="list-icon" onClick={deleteHandler} />
                </div>
            </div>
            <div className="list-new-item">
                <input
                    type="text"
                    placeholder="Add new item"
                    value={newItemName}
                    onChange={inputHandler}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") addNewItemHandler();
                    }}
                />
                <Plus className="plus-icon" onClick={addNewItemHandler} />
            </div>
            {error && <p className="input-validation-error">{error}</p>}
            {list.items
                // .slice()
                // .reverse()
                .map((item, index) => (
                    <ListItem
                        key={index}
                        item={item}
                        setUserLists={setUserLists}
                        checkItemHandler={() => checkItemHandler(item, index)}
                    />
                ))}
        </div>
    );
};

export default List;
