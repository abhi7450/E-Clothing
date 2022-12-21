import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import { CategoryContainer, Title } from "./category.styles.jsx";
import { useSelector } from "react-redux";
import { selectCategoryMap } from "../../store/features/categories/categoriesSlice";

const Category = () => {
  const { category } = useParams();
  const { categoryMap } = useSelector(selectCategoryMap);
  const [products, setProducts] = useState(categoryMap[category]);
  useEffect(() => {
    setProducts(categoryMap[category]);
  }, [category, categoryMap]);

  return (
    <>
      <Title>{category.toUpperCase()}</Title>
      <CategoryContainer>
        {products && products.map((product) => <ProductCard key={product.id} product={product} />)}
      </CategoryContainer>
    </>
  );
};

export default Category;
