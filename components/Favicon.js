/* eslint-disable */
// Module imports
import React from 'react'





// Component constants
const appleFavicons = [
  '57x57',
  '60x60',
  '72x72',
  '76x76',
  '114x114',
  '120x120',
  '144x144',
  '152x152',
  '180x180',
]
const generalFavicons = [
  '16x16',
  '32x32',
  '96x96',
]





const Favicon = () => (
  <React.Fragment>
    <meta name="msapplication-TileColor" content="#ffffff" />
    <meta name="msapplication-TileImage" content="/static/images/favicon/ms-icon-144x144.png" />
    <meta name="theme-color" content="#ffffff" />

    {appleFavicons.map(size => (
      <link
        href={`/static/images/favicon/apple-icon-${size}.png`}
        key={size}
        rel="apple-touch-icon"
        sizes={size} />
    ))}

    {generalFavicons.map(size => (
      <link
        href={`/static/images/favicon/favicon-${size}.png`}
        key={size}
        rel="icon"
        sizes={size}
        type="image/png" />
    ))}

    <link
      href="/static/images/favicon/android-icon-192x192.png"
      rel="icon"
      sizes="192x192"
      type="image/png" />
  </React.Fragment>
)





export { Favicon }
