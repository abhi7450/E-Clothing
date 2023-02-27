import CategoryPreview from "../../components/category-preview/category-preview.component";
import { useSelector } from "react-redux";
import { selectCategoryMap } from "../../store/features/categories/categories.selector";

const CategoriesPreview = () => {
  const categoryMap = useSelector(selectCategoryMap);
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
