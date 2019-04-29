/* eslint-disable */
// Module imports
import Document, { Head, Main, NextScript } from 'next/document'





// Component imports
import { Favicon } from '../components/Favicon'





// Component constants
const fonts = ['Cinzel Decorative']





export default class MyDocument extends Document {
  render () {
    return (
      <html>
        {/* <html lang={this.props.__NEXT_DATA__.props.initialProps.initialLanguage}> */}
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />

          <Favicon />

          <link
            href="/static/manifest.json"
            rel="manifest" />
        </Head>

        <body>
          <Main />

          <NextScript />

          <div id="dialog-container" />

          <div id="alert-container" />

          {fonts.map(font => (
            <link
              href={`//fonts.googleapis.com/css?family=${font.replace(/\s/g, '+')}`}
              key={font}
              rel="stylesheet" />
          ))}
        </body>
      </html>
    )
  }
}
