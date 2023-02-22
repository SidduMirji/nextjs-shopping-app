import {
  addItemToCart,
  CartProduct,
  removeItemFromCart,
  updateQuantity,
} from "@/store/cartSlice";
import { RootState } from "@/store/store";
import { Product } from "@/types/types";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useProductCart = () => {
  const [cart, setCart] = useState<CartProduct[]>(() => {
    const storedCart = localStorage.getItem("productCart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("productCart", JSON.stringify(cart));
  }, [cart]);

  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);

  const updateCart = () => {
    const newCart = items.map(({ id, title, price, quantity, thumbnail }) => ({
      id,
      title,
      price,
      quantity,
      thumbnail,
    }));
    setCart(newCart);
  };

  useEffect(() => {
    updateCart();
  }, [items]);

  const addToCartHandler = (product: Product) => {
    dispatch(addItemToCart({ ...product, quantity: 1 }));
  };

  const removeFromCartHandler = (id: number) => {
    const itemToRemove = items.find((item) => item.id === id);
    if (itemToRemove) {
      dispatch(removeItemFromCart(itemToRemove.id));
    }
  };

  const updateCartHandler = (product: { id: number; quantity: number }) => {
    dispatch(updateQuantity(product));
  };

  return {
    cart,
    setCart,
    addToCartHandler,
    removeFromCartHandler,
    updateCartHandler,
  };
};

export default useProductCart;
