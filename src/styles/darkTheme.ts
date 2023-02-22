import { createTheme } from "@material-ui/core/styles";

const darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#424242",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});

export default darkTheme;
