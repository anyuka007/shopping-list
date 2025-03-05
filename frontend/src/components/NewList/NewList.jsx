import { useState, useRef } from "react";
import "./NewList.css";
import { fetchUsersLists } from "../../utils/fetchLists";
import Button from "../Button/Button";
import { useLogout } from "../../utils/useLogout";
import { createList } from "../../utils/listAPI";
import useClickOutside from "../../utils/useClickOutside";

// eslint-disable-next-line react/prop-types
const NewList = ({ setUserLists }) => {
    const [listTitle, setListTitle] = useState("");
    const [error, setError] = useState("");
    const newListNameInputRef = useRef(null);
    const logout = useLogout();
    const [ loading, setLoading ] = useState(false);

    
    // Use the custom hook to handle click outside the input field
    useClickOutside(newListNameInputRef, () => setError(""));

    const inputHandler = (event) => {
        setError("");
        setListTitle(event.target.value);
    };

    const createListHandler = async () => {
        if (!listTitle) {
            setError("Fill in this field");
            return
        }  
        if(loading) {
            return}  
        setLoading(true);
        try {
            const response = await createList(logout, listTitle, setError);
            if (response) 
            {const updatedLists = await fetchUsersLists();
            setUserLists(updatedLists);
            setListTitle("");}
        } catch (error) {
            console.error("Error creating list:", error);
            setError("Unable to create list");
        } finally {
                setLoading(false);
            }
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
