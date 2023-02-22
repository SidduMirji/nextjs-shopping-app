import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { NextPage } from "next";
import { RootState } from "@/store/store";
import { initCartItems } from "@/store/cartSlice";
import { Box, List, styled, Typography } from "@material-ui/core";

const StyledTotalText = styled(Typography)({
  textAlign: "right",
  padding: 15,
});

const StyledTypography = styled(Typography)({
  display: "flex",
  padding: 10,
  justifyContent: "center",
});

const CartPage: NextPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const total = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const storedCart = localStorage.getItem("productCart");
    const cartData = storedCart ? JSON.parse(storedCart) : [];
    dispatch(initCartItems(cartData));
  }, []);
  return (
    <Box sx={{ p: 2 }}>
      <StyledTypography variant="h4">Cart</StyledTypography>
      {cartItems.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        <>
          <List>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </List>
          <StyledTotalText variant="h6">Total: ${total}</StyledTotalText>
        </>
      )}
    </Box>
  );
};

export default CartPage;
