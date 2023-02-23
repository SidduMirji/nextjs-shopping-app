import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { NextPage } from "next";
import { RootState } from "@/store/store";
import { initCartItems } from "@/store/cartSlice";
import { Box, Button, List, styled, Typography } from "@mui/material";

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
  const { items } = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch();
  useEffect(() => {
    const storedCart = localStorage.getItem("productCart");
    const cartData = storedCart ? JSON.parse(storedCart) : [];
    dispatch(initCartItems(cartData));
  }, []);

  const total = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity * item.price, 0),
    [items]
  );

  return (
    <Box sx={{ p: 2 }}>
      <StyledTypography variant="h4">Cart</StyledTypography>
      {items.length === 0 ? (
        <StyledTypography variant="body1">Your cart is empty.</StyledTypography>
      ) : (
        <>
          <List>
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </List>
         
          <StyledTotalText variant="h6">Total: ${total}</StyledTotalText>
          <Button variant="contained">Check Out</Button>
        </>
      )}
    </Box>
  );
};

export default CartPage;
