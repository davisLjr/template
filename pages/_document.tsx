import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="es-CL">
      <Head>
        {/* Fonts - optimized weights */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        <link rel="dns-prefetch" href="https://res.cloudinary.com" />

        <link
          rel="preload"
          as="image"
          href="https://res.cloudinary.com/dljbxdjl7/image/upload/q_auto,w_1200,f_webp,c_limit/v1764758657/hero_lftpbg.jpg"
          fetchPriority="high"
        />

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