/** @jsx jsx */
import { jsx } from '@chakra-ui/core';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import documentLang from 'next-translate/documentLang'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html 
        lang={documentLang(this.props)}
        // Sticky Footer Flexbox
        sx={{
          height: '100%',
          'body, #__next': {
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          },
          'main': {
            flex: '1 0 auto'
          },
          'footer': {
            flexShrink: 0
          }
        }}>
        <Head>
          <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-chrome-192x192.png"/>
          <link rel="icon" type="image/png" sizes="512x512" href="/favicon/android-chrome-512x512.png"/>
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
          <link rel="manifest" href="/favicon/site.webmanifest"/>
          <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#000000"/>
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
          <meta name="theme-color" content="#000" />
          <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument