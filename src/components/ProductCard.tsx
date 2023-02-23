import React from "react";
import { Product } from "@/types/types";
import useProductCart from "@/hooks/useProductCart";
import { Card, CardActions, CardContent, CardMedia, IconButton, styled, Tooltip, Typography } from "@mui/material";
import { AddShoppingCart } from "@material-ui/icons";

interface ProductCardProps {
  product: Product;
}

const StyledProductCard = styled(Card)({
  padding: 0,
});

const StyledProductContent = styled(CardContent)({
  height: "120px",
  overflow: "hidden",
});

const StyledCardActions = styled(CardActions)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "auto",
});

const StyledCartButton = styled(IconButton)({
  border: "solid .5px #151eef",
});

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCartHandler } = useProductCart();
  const handleAddToCart = () => {
    addToCartHandler(product);
  };

  return (
    <StyledProductCard>
      <CardMedia
        component="img"
        alt={product.title}
        height="140"
        image={product.thumbnail}
        title={product.title}
      />
      <StyledProductContent>
        <Typography gutterBottom variant="h5" component="h2">
          {product.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {product.description}
        </Typography>
      </StyledProductContent>
      <StyledCardActions>
        <Typography variant="h6">${product.price.toFixed(2)}</Typography>
        <Tooltip title="Add to cart">
        <StyledCartButton
          aria-label="Add to cart"
          onClick={() => handleAddToCart()}
        >
          <AddShoppingCart />
        </StyledCartButton>
        </Tooltip>
      </StyledCardActions>
    </StyledProductCard>
  );
};

export default ProductCard;
