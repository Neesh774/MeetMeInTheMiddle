import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import MetaTags from "../components/base/MetaTags";
import { GoogleAnalytics } from "nextjs-google-analytics";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <GoogleAnalytics trackPageViews />
      <MetaTags
        title="Meet Me in the Middle"
        description="Find the best meeting spots right in the middle of you and all your friends."
      />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
