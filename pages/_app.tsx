import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ServiceModalProvider } from "@/contexts/ServiceModalContext";
import { Layout } from "@/components/layout/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <ServiceModalProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ServiceModalProvider>
    </ThemeProvider>
  );
}
