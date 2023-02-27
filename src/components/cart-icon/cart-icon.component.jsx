import { useDispatch, useSelector } from "react-redux";
import { CartIconContainer, ItemCount, ShoppingIcon } from "./cart-icon.styles";
import { setIsCartOpen } from "../../store/features/cart/cartSlice";
import { selectCartCount, selectIsCartOpen } from "../../store/features/cart/cart.selector";

const CartIcon = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);

  const toogleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={toogleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
