/* eslint-disable react/prop-types */
import { Pencil, Trash2, Check, X } from "lucide-react";
import "./ListItem.css";
import { useState } from "react";
//import { fetchUsersLists } from "../../utils/fetchLists";
import { isTokenValid } from "../../utils/checkToken";
import { useLogout } from "../../utils/useLogout";
import { fetchList } from "../../utils/fetchList";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { API_URL } from "../../utils/constants";

const ListItem = ({ item, setUserLists, list }) => {
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState(item.name);
  const [fullText, setFullText] = useState(false);
  const logout = useLogout();
  const [loading, setLoading] = useState(false);

  const itemIndex = list.items.indexOf(item);
  const token = localStorage.getItem("token");

  const checkboxChangeHandler = async (e) => {
    const newCheckedState = e.target.checked;

    await editItem({ isChecked: newCheckedState });
    /* const updatedLists = await fetchUsersLists();
        setUserLists(updatedLists); */
    const updatedList = await fetchList(list._id);
    setUserLists((prevLists) =>
      prevLists.map((li) => (li._id === updatedList._id ? updatedList : li))
    );
  };

  const newNameInputHandler = (e) => {
    setNewName(e.target.value);
  };

  const saveNewNameHandler = async () => {
    if (newName === item.name || !newName) {
      setEditMode(false);
      return;
    }
    setLoading(true);
    try {
      await editItem({ newName: newName });
      /* const updatedLists = await fetchUsersLists();
        setUserLists(updatedLists); */
      const updatedList = await fetchList(list._id);
      setUserLists((prevLists) =>
        prevLists.map((li) => (li._id === updatedList._id ? updatedList : li))
      );
      setEditMode(false);
    } catch (error) {
      console.error("Error editing item:", error);
    } finally {
      setLoading(false);
    }
  };

  const editItem = async (changes) => {
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
        itemIndex: itemIndex,
        ...changes,
      }),
    };
    const response = await fetch(
      `${API_URL}/items/${listId}`,
      requestOptions
    );
    const data = await response.json();
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error editing list");
    }
    return data;
  };

  const deleteItemHandler = async () => {
    setLoading(true);
    try {
      await deleteItem();
      /* const updatedLists = await fetchUsersLists();
        setUserLists(updatedLists); */
      const updatedList = await fetchList(list._id);
      setUserLists((prevLists) =>
        prevLists.map((li) => (li._id === updatedList._id ? updatedList : li))
      );
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async () => {
    const listId = list._id;
    if (!token || !isTokenValid(token)) {
      logout();
    }
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        itemIndex: itemIndex,
      }),
    };
    const response = await fetch(
      `${API_URL}/items/${listId}`,
      requestOptions
    );

    const data = await response.json();
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error deleting item");
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
              checked={item.isChecked}
              onChange={checkboxChangeHandler}
            />

            <p
              className={fullText ? "list-item-name-full-text" : ""}
              onDoubleClick={() => setEditMode(true)}
              onClick={() => {
                setFullText(!fullText);
              }}
            >
              {item.name}
            </p>
          </>
        ) : (
          <input
            className="list-item-new-name-input"
            type="text"
            maxLength="50"
            placeholder={item.name}
            value={newName}
            onChange={newNameInputHandler}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveNewNameHandler();
            }}
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
                }
              }}
            />
            {loading ? (
              <LoadingSpinner color="#84a59d" size={20} />
            ) : (
              <Trash2 className="list-item-icon" onClick={deleteItemHandler} />
            )}
          </>
        ) : (
          <>
            {loading ? (
              <LoadingSpinner color="#84a59d" size={20} />
            ) : (
              <Check className="list-item-icon" onClick={saveNewNameHandler} />
            )}
            <X className="list-item-icon" onClick={() => setEditMode(false)} />
          </>
        )}
      </div>
    </div>
  );
};

export default ListItem;
