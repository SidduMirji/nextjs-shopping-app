import React from "react";
import { Grid, Box } from "@material-ui/core";
import { Product } from "@/types/types";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <Box m={2}>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;
