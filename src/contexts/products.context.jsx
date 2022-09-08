import { useState } from "react";
import { createContext } from "react";
import PRODUCTS from "../assets/shop-data.json";

export const ProductsContext = createContext({
    products: [],
});

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState(PRODUCTS);
    const value = { products, setProducts };
    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};
