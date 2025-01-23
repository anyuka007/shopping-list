import React from "react";
import "./List.css";

const List = () => {
    return (
        <div className="list-container">
            <div className="list-name">
                <div>List's name</div>
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
            <div className="list-item-name">
                <input type="checkbox" />
                <div>Item</div>
                <button>Delete</button>
            </div>
        </div>
    );
};

export default List;
