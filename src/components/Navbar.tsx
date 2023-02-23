import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  styled,
  Tooltip,
} from "@mui/material";
import {
  AddShoppingCart,
  Brightness4,
  Brightness7,
  List,
} from "@material-ui/icons";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useMemo } from "react";
import Link from "next/link";
import useToggleTheme from "@/hooks/useThemeToggle";
import lightTheme from "@/styles/lightTheme";
import darkTheme from "@/styles/darkTheme";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1),
  color: theme.palette.primary.contrastText,
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
}));

const Navbar: React.FC<any> = ({ setTheme }) => {
  const cart = useSelector((state: RootState) => state.cart);
  const { activeTheme, toggleTheme } = useToggleTheme();
  const { items } = cart;

  const totalQuantity = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items]
  );

  const handelChangeTheme = () => {
    setTheme(activeTheme.palette.mode == "light" ? darkTheme : lightTheme);
    toggleTheme();
  };

  return (
    <StyledAppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          My Shopping App
        </Typography>

        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Tooltip title={`View mode ${activeTheme.palette.mode}`}>
            <StyledIconButton onClick={() => handelChangeTheme()}>
              {activeTheme.palette.mode === "light" ? (
                <Brightness7 />
              ) : (
                <Brightness4 />
              )}
            </StyledIconButton>
          </Tooltip>
          <Link href="/">
            <Tooltip title="View Products Page">
              <StyledIconButton aria-label="show product page" color="inherit">
                <List />
              </StyledIconButton>
            </Tooltip>
          </Link>
          <Link href="/cart">
            <Tooltip title="View Cart Page">
              <StyledIconButton aria-label="show cart count" color="inherit">
                <Badge badgeContent={totalQuantity} color="error">
                  <AddShoppingCart />
                </Badge>
              </StyledIconButton>
            </Tooltip>
          </Link>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
