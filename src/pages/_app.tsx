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
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Layout setTheme={setTheme}>
            <Container maxWidth="lg">
              <Component {...pageProps} />
            </Container>
          </Layout>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
