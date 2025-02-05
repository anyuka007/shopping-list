import "./List.css";
/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons"; */
import { Pencil, Trash2 } from "lucide-react";
import ListItem from "./ListItem.jsx";

const List = () => {
    return (
        <div className="list-container">
            <div className="list-name">
                <div>
                    <h3>Name of the list</h3>
                </div>
                <div>
                    <Pencil className="list-name-icon" />
                    <Trash2 className="list-name-icon" />
                </div>
            </div>
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
        </div>
    );
};

export default List;
