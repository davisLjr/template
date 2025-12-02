import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="es-CL">
      <Head>
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Theme Color */}
        <meta name="theme-color" content="#2B7FD4" />
        <meta name="msapplication-TileColor" content="#2B7FD4" />

        {/* Humans.txt */}
        <link type="text/plain" rel="author" href="/humans.txt" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
