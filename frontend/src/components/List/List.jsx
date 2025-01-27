import "./List.css";
/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons"; */
import { Pencil, Trash2 } from "lucide-react";

const List = () => {
    return (
        <div className="list-container">
            <div className="list-name">
                <div>Name of the list</div>
                <button>
                    <Pencil />
                </button>
                <button>
                    <Trash2 />
                </button>
            </div>
            <div className="list-item-name">
                <input type="checkbox" />
                <div>Item</div>
                <button>Delete</button>
            </div>
            <div className="list-item-name">
                <input type="checkbox" />
                <div>Item</div>
                <button>Delete</button>
            </div>
            <div className="list-item-name">
                <input type="checkbox" />
                <div>Item</div>
                <button>Delete</button>
            </div>
        </div>
    );
};

export default List;
