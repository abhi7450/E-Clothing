import React from "react";
import ComponentItem from "../component-item/component-item.component";
import "./directory.styles.scss";
const Directory = ({ categories }) => {
    return (
        <div className="directory-container">
            {categories.map((category) => (
                <ComponentItem key={category.id} category={category} />
            ))}
        </div>
    );
};

export default Directory;
