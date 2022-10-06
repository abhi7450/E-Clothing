import { useEffect, useState } from "react";
import { createContext } from "react";

import { getCollectionAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
  categoryMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoryMap, setCategoryMap] = useState({});

  useEffect(() => {
    const getCategoryMap = async () => {
      const categoryMap = await getCollectionAndDocuments();
      setCategoryMap(categoryMap);
    };
    getCategoryMap();
  }, []);

  const value = { categoryMap };
  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
};
