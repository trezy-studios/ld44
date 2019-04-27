// Module imports
const crypto = require('crypto')
const git = require('git-rev-sync')
const webpack = require('webpack')
const withCSS = require('@zeit/next-css')
const withWorkers = require('@zeit/next-workers')





// Component imports
const packageData = require('./package.json')





// Component constants
const {
  CIRCLE_BUILD_NUM,
  CIRCLE_PROJECT_REPONAME,
  CIRCLE_PROJECT_USERNAME,
  CIRCLECI,
  LOCALE_SUBPATHS,
/* eslint-disable-next-line no-undef */
} = process.env
const DEV_BUILD_ID_LENGTH = 16





module.exports = withWorkers(withCSS({
  generateBuildId: () => {
    if (CIRCLECI) {
      return git.long().toLowerCase()
    }
    return `DEV_${crypto.randomBytes(DEV_BUILD_ID_LENGTH).toString('hex').toLowerCase()}`
  },

  publicRuntimeConfig: {
    localeSubpaths: LOCALE_SUBPATHS || 'none',
    apis: {},
  },

  webpack: (config, { buildId, dev }) => {
    const repositoryPath = `${CIRCLE_PROJECT_USERNAME}/${CIRCLE_PROJECT_REPONAME}` || /(?:git@|https:\/\/)github.com(?:\/|:)(.+\/.+).git/ugi.exec(git.remoteUrl())[1]

    let buildPath = null

    if (CIRCLECI) {
      buildPath = `https://circleci.com/gh/${repositoryPath}/${CIRCLE_BUILD_NUM ? `${CIRCLE_BUILD_NUM}` : ''}`
    }

    config.plugins.push(new webpack.DefinePlugin({
      $BUILD_BRANCH: JSON.stringify(git.branch()),
      $BUILD_COMMIT: JSON.stringify(git.long()),
      $BUILD_DATE: JSON.stringify((new Date()).toISOString()),
      $BUILD_PATH: JSON.stringify(buildPath),
      $BUILD_ID: JSON.stringify(CIRCLE_BUILD_NUM),
      $IS_DEVELOPMENT: JSON.stringify(dev),
      $IS_STAGING: JSON.stringify(['develop', 'beta'].includes(git.branch())),
      $NEXT_BUILD_ID: JSON.stringify(buildId),
      /* eslint-disable-next-line no-undef */
      $NODE_VERSION: JSON.stringify(process.version),
      $REPOSITORY_PATH: JSON.stringify(repositoryPath),
      $VERSION: JSON.stringify(packageData.version),
    }))

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
