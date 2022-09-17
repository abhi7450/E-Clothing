import { useContext } from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";

import { CategoriesContext } from "../../contexts/categories.context";

const CategoriesPreview = () => {
    const { categoryMap } = useContext(CategoriesContext);
    return (
        <>
            {Object.keys(categoryMap).map((title) => {
                const products = categoryMap[title];
                return <CategoryPreview key={title} title={title} products={products} />;
            })}
        </>
    );
};

export default CategoriesPreview;
