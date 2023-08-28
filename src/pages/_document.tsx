import Document, { Html, Head, Main, NextScript } from "next/document";
import type { DocumentProps } from "next/document";
import i18nextConfig from "../../next-i18next.config";
import { Fragment } from "react";

class MyDocument extends Document<DocumentProps> {
  render() {
    const currentLocale = this.props.__NEXT_DATA__.locale ?? i18nextConfig.i18n.defaultLocale;
    const gaTrackingId = "G-NWBVV46Z0D";

    return (
      <Html lang={currentLocale} className="theme-light">
        <Head>
          <meta charSet="utf-8" />
          <meta name="color-scheme" content="light" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&display=swap" rel="stylesheet"></link>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/react-toastify@9.0.7/dist/ReactToastify.min.css"></link>
          <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
          <meta name="theme-color" content="#ffffff"></meta>
        </Head>
        <body>
          <Main />
          <NextScript />

          {process.env.NODE_ENV === "development" || !gaTrackingId ? null : (
            <Fragment>
              <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`} />
              <script
                async
                id="gtag-init"
                dangerouslySetInnerHTML={{
                  __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaTrackingId}', {
                  page_path: window.location.pathname,
                });
              `
                }}
              />
            </Fragment>
          )}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
