import React from "react";
import { CartItemContainer, ItemDetail } from "./cart-item.styles.jsx";

const CartItem = ({ cartItem }) => {
  const { name, imageUrl, quantity, price } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt="" />
      <ItemDetail>
        <span>{name}</span>
        <span>
          {quantity}* ${price}
        </span>
      </ItemDetail>
    </CartItemContainer>
  );
};

export default CartItem;
