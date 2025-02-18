import { useEffect, useState, useRef } from "react";
import "./NewList.css";
import { clearLocalStorage, isTokenValid } from "../../utils/checkToken";
import { useNavigate } from "react-router-dom";
import { fetchUsersLists } from "../../utils/fetchLists";
import Button from "../Button/Button";

// eslint-disable-next-line react/prop-types
const NewList = ({ setUserLists }) => {
    const [listTitle, setListTitle] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const newListNameInputRef = useRef(null);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    //function checks if the click event occurred outside of the input field referenced by newListNameInputRef
    const handleClickOutside = (event) => {
        if (
            newListNameInputRef.current &&
            !newListNameInputRef.current.contains(event.target)
        ) {
            setError("");
        }
    };

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
                const updatedLists = await fetchUsersLists();
                setUserLists(updatedLists);
                setListTitle("");
            } catch (error) {
                console.error("Error creating list:", error);
                setError("Unable to create list");
            }
        }
    };

    const createList = async () => {
        const token = localStorage.getItem("token");
        if (!token || !isTokenValid(token)) {
            clearLocalStorage();
            navigate("/login");
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
        const data = await response.json();
        if (
            response.status === 409 &&
            data.message === "List with such title already exists"
        ) {
            setError("List with such title exists");
            return;
        } else if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error creating list");
        }

        return await data;
    };

    return (
        <div className="new-list-container">
            <div className="new-list-name">
                <div className="new-list-name-input-container">
                    <input
                        ref={newListNameInputRef}
                        type="text"
                        maxLength="18"
                        placeholder="Name of the list"
                        value={listTitle}
                        onChange={inputHandler}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") createListHandler();
                        }}
                    />
                    {error && <p className="form-validation-error">{error}</p>}
                </div>

                <div className="new-list-button-container">
                    <Button
                        text="Create New List"
                        /* width="250px" */
                        /* fontSize="16px" */
                        onClickHandler={createListHandler}
                    />
                </div>
            </div>
        </div>
    );
};

export default NewList;
