import { Pencil, Trash2 } from "lucide-react";
import "./ListItem.css";

const ListItem = () => {
    return (
        <div className="list-item-container">
            <div className="list-item-container-left">
                <input type="checkbox" />
                <p>Item name</p>
            </div>
            <div className="list-item-container-right">
                <Pencil className="list-item-icon" />
                <Trash2 className="list-item-icon" />
            </div>
        </div>
    );
};

export default ListItem;
