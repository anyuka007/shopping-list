import { Pencil, Trash2, Check } from "lucide-react";
import "./ListItem.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUsersLists } from "../../utils/fetchLists";
import { isTokenValid } from "../../utils/checkToken";

const ListItem = ({ item, setUserLists, list }) => {
    const [isChecked, setIsChecked] = useState(item.isChecked);
    const [editMode, setEditMode] = useState(false);
    const [newName, setNewName] = useState("");
    const navigate = useNavigate();

    const itemIndex = list.items.indexOf(item);
    const token = localStorage.getItem("token");

    const checkboxChangeHandler = async (e) => {
        const newCheckedState = e.target.checked;
        setIsChecked(newCheckedState);
        //console.log("listName", list.title);
        console.log("itemName", item.name);
        await editItem({ isChecked: newCheckedState });
        const updatedLists = await fetchUsersLists();
        setUserLists(updatedLists);
    };

    const newNameInputHandler = (e) => {
        setNewName(e.target.value);
    };

    const saveNewNameHandler = () => {
        setNewName(newName);
        console.log("newName", newName);
    };

    const editItem = async (changes) => {
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
                itemIndex: itemIndex,
                ...changes,
            }),
        };
        const response = await fetch(
            `http://localhost:5000/shoppinglist/${listId}`,
            requestOptions
        );
        const data = await response.json();
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error editing list");
        }
        return data;
    };

    return (
        <div className="list-item-container">
            <div className="list-item-container-left">
                {!editMode ? (
                    <>
                        <input
                            className="list-item-checkbox"
                            type="checkbox"
                            checked={isChecked}
                            onChange={checkboxChangeHandler}
                        />

                        <p>{item.name}</p>
                    </>
                ) : (
                    <input
                        className="list-item-new-name-input"
                        type="text"
                        value={newName}
                        onChange={newNameInputHandler}
                    />
                )}
            </div>
            <div className="list-item-container-right">
                {!editMode ? (
                    <>
                        <Pencil
                            className="list-item-icon"
                            onClick={() => {
                                {
                                    setEditMode(true);
                                    setNewName("");
                                }
                            }}
                        />
                        <Trash2 className="list-item-icon" />{" "}
                    </>
                ) : (
                    <Check
                        className="list-item-icon"
                        onClick={() => {
                            saveNewNameHandler();
                            setEditMode(false);
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default ListItem;
