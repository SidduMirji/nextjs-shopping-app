import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import lightTheme from "@/styles/lightTheme";
import darkTheme from "@/styles/darkTheme";
import { useMediaQuery } from "@mui/material";

function useToggleTheme() {
  const userSystemThemePreferenceDark = useMediaQuery(
    "(prefers-color-scheme: dark)"
  );

  const [activeTheme, setActiveTheme] = useState(darkTheme);
  const [cookieTheme, setCookieTheme] = useCookies(["theme-preference"]);

  const defaultInitialTheme = userSystemThemePreferenceDark ? "dark" : "light";
  const preferredTheme =
    cookieTheme && cookieTheme["theme-preference"]
      ? cookieTheme["theme-preference"]
      : defaultInitialTheme;

  const [selectedTheme, setSelectedTheme] = useState(preferredTheme);

  const toggleTheme = () => {
    const desiredTheme = selectedTheme === "light" ? "dark" : "light";

    setSelectedTheme(desiredTheme);
    setCookieTheme("theme-preference", desiredTheme);
  };

  useEffect(() => {
    setActiveTheme(selectedTheme === "light" ? lightTheme : darkTheme);
  }, [selectedTheme]);

  return { activeTheme, toggleTheme };
}

export default useToggleTheme;
