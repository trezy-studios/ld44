// Module imports
const withCSS = require('@zeit/next-css')
const withWorkers = require('@zeit/next-workers')





// Component constants
const {
  LOCALE_SUBPATHS,
/* eslint-disable-next-line no-undef */
} = process.env





module.exports = withWorkers(withCSS({
  publicRuntimeConfig: {
    localeSubpaths: LOCALE_SUBPATHS || 'none',
    apis: {},
  },

  target: 'serverless',

  webpack: config => {
    config.module.rules.push({
      exclude: /node_modules/u,
      test: /\.svg$/u,
      loader: 'raw-loader',
    })

    config.module.rules.unshift({
      enforce: 'pre',
      exclude: /node_modules/u,
      loader: 'eslint-loader',
      test: /\.js$/u,
    })

    return config
  },
}))
