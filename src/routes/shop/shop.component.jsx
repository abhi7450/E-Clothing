import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

import { getCollectionAndDocuments } from "../../utils/firebase/firebase.utils";
import { setCategory } from "../../store/features/categories/categoriesSlice";
import { useDispatch } from "react-redux";
const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoryMap = async () => {
      const categoryArray = await getCollectionAndDocuments();
      console.log(categoryArray);

      dispatch(setCategory(categoryArray));
    };

    getCategoryMap();
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
