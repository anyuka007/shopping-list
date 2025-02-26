/* eslint-disable react/prop-types */
import "./List.css";
import {
    Pencil,
    Trash2,
    Plus,
    Check,
    X,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import ListItem from "./ListItem.jsx";
import { useEffect, useRef, useState } from "react";
import { fetchUsersLists } from "../../utils/fetchLists.js";
import { isTokenValid } from "../../utils/checkToken.js";
import { useLogout } from "../../utils/useLogout.js";
import { fetchList } from "../../utils/fetchList.js";

const isScreenLarge = window.innerWidth >= 768;

const List = ({ list, setUserLists }) => {
    const [newItemName, setNewItemName] = useState("");
    const [error, setError] = useState("");
    const [listName, setListName] = useState(list.title);
    const [editMode, setEditMode] = useState(false);
    const [fullText, setFullText] = useState(false);
    const [wholeList, setWholeList] = useState(isScreenLarge);
    const [isLargeScreen, setIsLargeScreen] = useState(isScreenLarge);
    const logout = useLogout();
    const newItemInputRef = useRef(null);

    const token = localStorage.getItem("token");

    // Handle window resize to update component's state based on the window's width
    useEffect(() => {
        const handleResize = () => {
            const isLarge = window.innerWidth >= 768;
            setIsLargeScreen(isLarge);
            setWholeList(isLarge);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // *** Handling click outside the input field

    // Clears error message when the user clicks outside the input field
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    //console.log("List name: ", list.title);

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
        /* const updatedLists = await fetchUsersLists(); setUserLists(updatedLists);*/
        const updatedList = await fetchList(list._id);
        setUserLists((prevLists) =>
            prevLists.map((li) =>
                li._id === updatedList._id ? updatedList : li
            )
        );

        setEditMode(false);
    };

    const editListName = async () => {
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
            const updatedList = await fetchList(list._id);
            setNewItemName("");
            setUserLists((prevLists) =>
                prevLists.map((li) =>
                    li._id === updatedList._id ? updatedList : li
                )
            );
        }
    };

    const addNewItem = async () => {
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
        <>
            <div
                className={
                    isLargeScreen || wholeList
                        ? "list-container"
                        : "short-list-container"
                }
            >
                {!wholeList ? (
                    <>
                        <div className="list-name">
                            <h3
                                className={
                                    fullText ? "list-name-full-text" : ""
                                }
                                onClick={() => {
                                    setFullText(!fullText);
                                }}
                            >
                                {list.title}
                            </h3>
                            <div className="list-name-icons">
                                <ChevronDown
                                    className="chevron-down"
                                    onClick={() => setWholeList(true)}
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="list-whole-list">
                        <div className="list-name">
                            <div className="list-name-left">
                                {!editMode ? (
                                    <h3
                                        className={
                                            fullText
                                                ? "list-name-full-text"
                                                : ""
                                        }
                                        onDoubleClick={() => setEditMode(true)}
                                        onClick={() => {
                                            setFullText(!fullText);
                                            console.log("1 click");
                                            console.log("full Text", fullText);
                                        }}
                                    >
                                        {list.title}
                                    </h3>
                                ) : (
                                    <input
                                        className="list-new-name-input"
                                        type="text"
                                        maxLength="30"
                                        placeholder={list.title}
                                        value={listName}
                                        onChange={listNewNameInputHandler}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter")
                                                saveNewNameHandler();
                                        }}
                                    />
                                )}
                            </div>
                            <div className="list-name-icons">
                                {!editMode ? (
                                    <>
                                        <Pencil
                                            className="list-icon"
                                            onClick={() => {
                                                {
                                                    setEditMode(true);
                                                }
                                            }}
                                        />
                                        <Trash2
                                            className="list-icon"
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
                                maxLength="50"
                                placeholder="Add new item"
                                value={newItemName}
                                onChange={inputHandler}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") addNewItemHandler();
                                }}
                            />
                            <Plus
                                className="plus-icon"
                                onClick={addNewItemHandler}
                            />
                        </div>
                        {error && (
                            <p className="input-validation-error">{error}</p>
                        )}
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
                        <div
                            className="chevron-up-wrapper"
                            onClick={() => setWholeList(false)}
                        >
                            <ChevronUp />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default List;
