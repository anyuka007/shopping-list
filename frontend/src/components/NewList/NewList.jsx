import { useEffect, useState, useRef } from "react";
import "./NewList.css";
import { isTokenValid } from "../../utils/checkToken";
import { fetchUsersLists } from "../../utils/fetchLists";
import Button from "../Button/Button";
import { useLogout } from "../../utils/useLogout";

// eslint-disable-next-line react/prop-types
const NewList = ({ setUserLists }) => {
    const [listTitle, setListTitle] = useState("");
    const [error, setError] = useState("");
    const newListNameInputRef = useRef(null);
    const logout = useLogout();
    const [ loading, setLoading ] = useState(false);

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
            setLoading(true);
            try {
                await createList();
                const updatedLists = await fetchUsersLists();
                setUserLists(updatedLists);
                setListTitle("");
            } catch (error) {
                console.error("Error creating list:", error);
                setError("Unable to create list");
            } finally {
                setLoading(false);
        }}
    };

    const createList = async () => {
        const token = localStorage.getItem("token");
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
                title: listTitle,
            }),
        };
        const response = await fetch(
            "https://shoppinglist-ap.onrender.com/shoppinglist",
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
                        maxLength="30"
                        placeholder="Name of the list"
                        value={listTitle}
                        onChange={inputHandler}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") createListHandler();
                        }}
                    />
                    {error && <p className="form-validation-error">{error}</p>}
                </div>
            </div>
            <div className="new-list-button-container">
                <Button
                    text="Create List"
                    onClickHandler={createListHandler}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default NewList;
