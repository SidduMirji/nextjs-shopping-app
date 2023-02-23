import { useEffect, useState } from "react";
import type { NextPage } from "next";

import { data } from "@/utils/data";
import { Product } from "@/types/types";
import ProductCard from "@/components/ProductCard";
import { useDispatch } from "react-redux";
import { initCartItems } from "@/store/cartSlice";
import { Grid, styled, Typography } from "@mui/material";

const StyledTypography = styled(Typography)({
  display: "flex",
  padding: 10,
  justifyContent: "center",
});

const Home: NextPage = () => {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const savedProducts = getProducts();
    if (savedProducts) {
      setProductsData(savedProducts);
    } else {
      saveProducts(data?.products);
    }
    const storedCart = localStorage.getItem("productCart");
    const cartData = storedCart ? JSON.parse(storedCart) : [];
    dispatch(initCartItems(cartData));
  }, []);

  const saveProducts = (products: any[]) => {
    const productsString = JSON.stringify(products);
    localStorage.setItem("products", productsString);
  };

  const getProducts = () => {
    const productsString = localStorage.getItem("products");
    if (productsString) {
      return JSON.parse(productsString);
    } else {
      return null;
    }
  };

  return (
    <>
      <StyledTypography variant="h4" gutterBottom>
        Products
      </StyledTypography>
      <Grid container spacing={3}>
        {productsData.map((product: Product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Home;
