import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";
export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const InitialState = {
  isCartOpen: false,
  cartCount: 0,
  cartTotal: 0,
  cartItems: [],
};

const CartReducer = (state, action) => {
  // payload must receive these values within the obj {cartCount.cartTotal,cartItems}
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS: {
      return {
        ...state,
        ...payload,
      };
    }
    case CART_ACTION_TYPES.SET_IS_CART_OPEN: {
      return {
        ...state,
        isCartOpen: payload,
      };
    }
    default:
      throw new Error(`Unhandled type of ${type} in cartReducer`);
  }
};

const addCartItem = (cartItems, productToAdd) => {
  // find if cartItems contain the productToAdd
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
  }
  // return new Array with modified cartItems/ new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};
const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);
  // Check if quantity is equal to 1 , then remove the item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }
  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
  );
};
const clearCartItem = (cartItems, cartItemToRemove) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
export const CartContext = createContext({
  isCartOpen: false,
  cartCount: 0,
  cartTotal: 0,
  cartItems: [],
  setIsCartOpen: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [{ cartItems, cartCount, cartTotal, isCartOpen }, dispatch] = useReducer(CartReducer, InitialState);

  // Action Generating Functions
  const updateCartItemsReducer = (newCartItems) => {
    // generate newCartCount
    const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

    // generate newCartTotal
    const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
    // dispatch the payload with all the value
    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal,
      })
    );
  };

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };
  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (checkoutItemToRemove) => {
    const newCartItems = clearCartItem(cartItems, checkoutItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    removeItemFromCart,
    clearItemFromCart,
    cartTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
