import React from "react";
import { Product } from "@/types/types";
import useProductCart from "@/hooks/useProductCart";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import { AddShoppingCart } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

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

interface StyledCartButtonProps {
  isSelected: boolean;
}

const StyledCartButton = styled(IconButton)<StyledCartButtonProps>(
  ({ theme, isSelected }) => ({
    backgroundColor: isSelected ? theme.palette.primary.main : "",
    "&:hover": {
      backgroundColor: isSelected ? theme.palette.primary.main : "",
    },
    color: isSelected ? theme.palette.primary.contrastText : "",
  })
);

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
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
            isSelected={cartItems.some(({ id }) => id === product.id)}
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
