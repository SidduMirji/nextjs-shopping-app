import React from "react";
import { CartProduct } from "@/store/cartSlice";
import Image from "next/image";
import { Add, Delete, Remove } from "@material-ui/icons";
import useProductCart from "@/hooks/useProductCart";
import { Box, Typography } from "@mui/material";
import { IconButton, Tooltip } from "@material-ui/core";

interface CartItemProps {
  item: CartProduct;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCartHandler, updateCartHandler } = useProductCart();

  const handleRemove = () => {
    removeFromCartHandler(item.id);
  };

  const handleIncreaseQuantity = () => {
    updateCartHandler({ id: item.id, quantity: item.quantity + 1 });
  };

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      updateCartHandler({ id: item.id, quantity: item.quantity - 1 });
    }
  };

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #eee",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Image src={item.thumbnail} alt={item.title} height={80} width={80} />
        <Box sx={{ ml: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {item.title}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Price: ${item.price}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", padding: 5 }}>
        <Tooltip title="Increase quantity">
          <IconButton size="small" onClick={handleIncreaseQuantity}>
            <Add />
          </IconButton>
        </Tooltip>
        <Typography variant="body1" sx={{ mx: 1 }}>
          {item.quantity}
        </Typography>
        <Tooltip title="Decrease quantity">
          <IconButton size="small" onClick={handleDecreaseQuantity}>
            <Remove />
          </IconButton>
        </Tooltip>
        <Tooltip title="Remove item from cart">
          <IconButton size="small" color="secondary" onClick={handleRemove}>
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default CartItem;
