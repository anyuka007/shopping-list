import { Pencil, Trash2 } from "lucide-react";
import "./ListItem.css";
import { useState } from "react";

const ListItem = ({ item, setUserLists, checkItemHandler }) => {
    const [isChecked, setIsChecked] = useState(item.isChecked);

    const checkboxChangeHandler = (e) => {
        setIsChecked(e.target.checked);
        console.log("isChecked", isChecked, item.isChecked);
        checkItemHandler();
    };
    return (
        <div className="list-item-container">
            <div className="list-item-container-left">
                <input
                    className="list-item-ckeckbox"
                    type="checkbox"
                    checked={isChecked}
                    onChange={checkboxChangeHandler}
                />
                <p>{item.name}</p>
            </div>
            <div className="list-item-container-right">
                <Pencil className="list-item-icon" />
                <Trash2 className="list-item-icon" />
            </div>
        </div>
    );
};

export default ListItem;
