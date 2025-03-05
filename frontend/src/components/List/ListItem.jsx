/* eslint-disable react/prop-types */
import { Pencil, Trash2, Check, X } from "lucide-react";
import "./ListItem.css";
import { useState } from "react";
//import { fetchUsersLists } from "../../utils/fetchLists";
import { useLogout } from "../../utils/useLogout";
import { fetchList } from "../../utils/fetchList";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { deleteItem, editItem } from "../../utils/itemAPI";

const ListItem = ({ item, setUserLists, list }) => {
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState(item.name);
  const [fullText, setFullText] = useState(false);
  const logout = useLogout();
  const [loading, setLoading] = useState(false);

  const itemIndex = list.items.indexOf(item);

  const checkboxChangeHandler = async (e) => {
    const newCheckedState = e.target.checked;

    await editItem({ isChecked: newCheckedState }, list, logout, itemIndex);
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
      await editItem({ newName: newName }, list, logout, itemIndex);
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
  

  const deleteItemHandler = async () => {
    setLoading(true);
    try {
      await deleteItem(list, logout, itemIndex
      );
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
