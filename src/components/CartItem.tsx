import React from "react";
import { CartProduct } from "@/store/cartSlice";
import Image from "next/image";
import { Add, Delete, Remove } from "@material-ui/icons";
import useProductCart from "@/hooks/useProductCart";
import { Box, Typography } from "@mui/material";
import { IconButton, Tooltip } from "@mui/material";

interface CartItemProps {
  item: CartProduct;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { id, quantity, title, thumbnail, price } = item;
  const { removeFromCartHandler, updateCartHandler } = useProductCart();

  const handleRemove = () => {
    removeFromCartHandler(id);
  };

  const handleIncreaseQuantity = () => {
    updateCartHandler({ id, quantity: quantity + 1 });
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      updateCartHandler({ id, quantity: quantity - 1 });
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
        <Image src={thumbnail} alt={title} height={80} width={80} />
        <Box sx={{ ml: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Price: ${price}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", padding: 1 }}>
        <Tooltip title="Increase quantity">
          <IconButton size="small" onClick={handleIncreaseQuantity}>
            <Add />
          </IconButton>
        </Tooltip>
        <Typography variant="body1">{quantity}</Typography>
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
