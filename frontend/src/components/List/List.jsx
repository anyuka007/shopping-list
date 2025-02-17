/* eslint-disable react/prop-types */
import "./List.css";
/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons"; */
import { Pencil, Trash2, Plus, Check, X } from "lucide-react";
import ListItem from "./ListItem.jsx";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUsersLists } from "../../utils/fetchLists.js";
import { isTokenValid } from "../../utils/checkToken.js";

const List = ({ list, setUserLists }) => {
    const [newItemName, setNewItemName] = useState("");
    const [error, setError] = useState("");
    const [listName, setListName] = useState(list.title);
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();
    const newItemInputRef = useRef(null);

    const token = localStorage.getItem("token");

    // *** Handling outside input field click

    // Clears error message when the user clicks outside the input field
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Checks if the click event occurred outside of the input field referenced by newItemInputRef
    const handleClickOutside = (event) => {
        if (
            newItemInputRef.current &&
            !newItemInputRef.current.contains(event.target)
        ) {
            setError("");
        }
    };

    // *** Renaming List

    const listNewNameInputHandler = (e) => {
        setListName(e.target.value);
        console.log("new name of the list: ", listName);
    };

    const saveNewNameHandler = async () => {
        await editListName();
        const updatedLists = await fetchUsersLists();
        setUserLists(updatedLists);
        setEditMode(false);
    };

    const editListName = async () => {
        const listId = list._id;
        if (!token || !isTokenValid(token)) {
            navigate("/login");
            throw new Error("No token found");
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

    // *** Deleting List

    const deleteHandler = async () => {
        //console.log("list is deleted");
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

    // ***Adding new Item to the List

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

    return (
        <div className="list-container">
            <div className="list-name">
                <div>
                    {!editMode ? (
                        <h3 onDoubleClick={() => setEditMode(true)}>
                            {list.title}
                        </h3>
                    ) : (
                        <input
                            className="list-new-name-input"
                            type="text"
                            placeholder={list.title}
                            value={listName}
                            onChange={listNewNameInputHandler}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") saveNewNameHandler();
                            }}
                        />
                    )}
                </div>
                <div>
                    {!editMode ? (
                        <>
                            <Pencil
                                className="list-item-icon"
                                onClick={() => {
                                    {
                                        setEditMode(true);
                                    }
                                }}
                            />
                            <Trash2
                                className="list-item-icon"
                                onClick={deleteHandler}
                            />{" "}
                        </>
                    ) : (
                        <>
                            <Check
                                className="list-item-icon"
                                onClick={saveNewNameHandler}
                            />
                            <X
                                className="list-item-icon"
                                onClick={() => setEditMode(false)}
                            />
                        </>
                    )}
                </div>
            </div>
            <div className="list-new-item">
                <input
                    ref={newItemInputRef}
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
                        list={list}
                    />
                ))}
        </div>
    );
};

export default List;
