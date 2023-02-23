import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "@/utils/createEmotionCache";
import Layout from "@/components/Layout";
import { Provider } from "react-redux";
import store from "@/store/store";
import useToggleTheme from "@/hooks/useThemeToggle";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import ErrorBoundary from "@/utils/ErrorBoundary";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { activeTheme } = useToggleTheme();
  const [theme, setTheme] = React.useState(activeTheme);

  React.useEffect(() => {
    setTheme(activeTheme);
  }, [activeTheme]);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>My Shopping App</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CssBaseline />

          <Layout setTheme={setTheme}>
            <Container maxWidth="lg">
              <ErrorBoundary>
                <Component {...pageProps} />
              </ErrorBoundary>
            </Container>
          </Layout>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
