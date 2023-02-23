import { Facebook, Instagram, Twitter } from "@material-ui/icons";
import { Box, styled, Typography } from "@mui/material";
import React from "react";

const StyledFooter = styled("footer")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(2),
  color: theme.palette.primary.contrastText,
  position: "static",
  bottom: 0,
  left: 0,
  width: "100%",
}));

const StyledSocials = styled(Box)(({ theme }) => ({
  width: "10em",
  padding: 20,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
}));

const Footer: React.FC<{}> = () => {
  return (
    <StyledFooter>
      <Typography variant="body2" align="center">
        &copy; {new Date().getFullYear()} My Shopping App. All rights reserved.
      </Typography>
      <Typography variant="body2" align="center">
        Created by Siddappa Mirji
      </Typography>
      <StyledSocials>
        <Instagram />
        <Twitter />
        <Facebook />
      </StyledSocials>
    </StyledFooter>
  );
};

export default Footer;
