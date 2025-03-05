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
import { useLogout } from "../../utils/useLogout.js";
import { fetchList } from "../../utils/fetchList.js";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.jsx";
import { deleteList, editListName } from "../../utils/listAPI.js";
import { addNewItem } from "../../utils/itemAPI.js";
import useClickOutside from "../../utils/useClickOutside.js";

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
  const [loading, setLoading] = useState({ list: false, item: false });

  // *** Handle window resize to update component's state based on the window's width
  useEffect(() => {
    let prevWidth = window.innerWidth;
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      if (prevWidth !== currentWidth) {
        const isLarge = window.innerWidth >= 768;
        setIsLargeScreen(isLarge);
        setWholeList(isLarge);
        prevWidth = currentWidth;
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // *** Handling click outside the input field

  // Use the custom hook to handle click outside the input field
  useClickOutside(newItemInputRef, () => setError(""));

  // *** Renaming List

  const listNewNameInputHandler = (e) => {
    setListName(e.target.value);
  };

  const saveNewNameHandler = async () => {
    setLoading({ list: true });
    try {
      await editListName(list, listName, logout);
      /* const updatedLists = await fetchUsersLists(); setUserLists(updatedLists);*/
      const updatedList = await fetchList(list._id);
      setUserLists((prevLists) =>
        prevLists.map((li) => (li._id === updatedList._id ? updatedList : li))
      );
      setEditMode(false);
    } catch (error) {
      console.error("Error editing list name:", error);
    } finally {
      setLoading({ list: false });
    }
  };

  // *** Deleting List

  const deleteHandler = async () => {
    setLoading({ list: true });
    try {
      await deleteList(list, logout);
      const updatedLists = await fetchUsersLists();
      setUserLists(updatedLists);
    } catch (error) {
      console.error("Error deleting list:", error);
    } finally {
      setLoading({ list: false });
    }
  };

  // ***Adding new Item to the List

  const inputHandler = (event) => {
    setError("");
    setNewItemName(event.target.value);
  };

  const addNewItemHandler = async () => {
    if (!newItemName) {
      setError("Please fill this field");
      return;
    }
    if (loading.item) {
      return;
    }
    setLoading({ item: true });
    try {
      const response = await addNewItem(list, logout, newItemName, setError);
      if (response) {
        const updatedList = await fetchList(list._id);

        setUserLists((prevLists) =>
          prevLists.map((li) => (li._id === updatedList._id ? updatedList : li))
        );
        setNewItemName("");
      }
    } catch (error) {
      console.error("Error adding new item:", error);
    } finally {
      setLoading({ item: false });
    }
  };

  return (
    <>
      <div
        className={
          isLargeScreen || wholeList ? "list-container" : "short-list-container"
        }
      >
        {!wholeList ? (
          <>
            <div className="list-name">
              <h3
                className={fullText ? "list-name-full-text" : ""}
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
                    className={fullText ? "list-name-full-text" : ""}
                    onDoubleClick={() => setEditMode(true)}
                    onClick={() => {
                      setFullText(!fullText);
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
                      if (e.key === "Enter") saveNewNameHandler();
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
                    {loading.list ? (
                      <LoadingSpinner color="#fefaf3" size={20} />
                    ) : (
                      <Trash2 className="list-icon" onClick={deleteHandler} />
                    )}
                  </>
                ) : (
                  <>
                    {loading.list ? (
                      <LoadingSpinner color="#fefaf3" size={20} />
                    ) : (
                      <Check
                        className="list-item-icon"
                        onClick={saveNewNameHandler}
                      />
                    )}
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
              {loading.item ? (
                <LoadingSpinner color="#84a59d" size={20} />
              ) : (
                <Plus className="plus-icon" onClick={addNewItemHandler} />
              )}
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
