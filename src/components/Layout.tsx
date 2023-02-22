import { styled } from "@material-ui/core";
import React, { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface Props {
  children?: ReactNode;
  setTheme?: any;
}

const StyledLayout = styled("div")({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

const StyledMain = styled("main")({
  flex: 1,
  paddingBottom: "10em",
});

const Layout: React.FC<Props> = ({ children, setTheme }) => {
  return (
    <StyledLayout className="layout">
      <Navbar setTheme={setTheme} />
      <StyledMain>{children}</StyledMain>
      <Footer />
    </StyledLayout>
  );
};

export default Layout;
