import { useEffect, useMemo, useState } from "react";
import type { NextPage } from "next";
import { useDispatch } from "react-redux";
import { initCartItems } from "@/store/cartSlice";
import { Grid, styled, Typography } from "@mui/material";
import { Product } from "@/types/types";
import ProductCard from "@/components/ProductCard";
import { data } from "@/utils/data";

const StyledTypography = styled(Typography)({
  display: "flex",
  padding: 10,
  justifyContent: "center",
});

const Home: NextPage = () => {
  const [productsData, setProductsData] = useState<any[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const savedProducts = getProducts();
      if (savedProducts) {
        setProductsData(savedProducts);
      } else {
        setProductsData(data?.products);
        saveProducts(data?.products);
      }
      const storedCart = localStorage.getItem("productCart");
      const cartData = storedCart ? JSON.parse(storedCart) : [];
      dispatch(initCartItems(cartData));
    } catch (err) {
      console.error(err);
    }
  }, []);

  const memoizedProductsData = useMemo(() => productsData, [productsData]);

  const saveProducts = (products: any[]) => {
    try {
      const productsString = JSON.stringify(products);
      localStorage.setItem("products", productsString);
    } catch (err) {
      console.error(err);
    }
  };

  const getProducts = () => {
    try {
      const productsString = localStorage.getItem("products");
      if (productsString) {
        return JSON.parse(productsString);
      } else {
        return null;
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  if (memoizedProductsData.length <= 0) {
    return (
      <StyledTypography variant="h5" gutterBottom>
        No Products are available
      </StyledTypography>
    );
  }

  return (
    <>
      <StyledTypography variant="h4" gutterBottom>
        Products
      </StyledTypography>
      <Grid container spacing={3}>
        {memoizedProductsData.map((product: Product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Home;
