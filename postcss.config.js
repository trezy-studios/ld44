const path = require('path')





module.exports = {
  exec: true,
  plugins: {
    'postcss-easy-import': {},
    'postcss-for': {},
    'postcss-functions': {
      /* eslint-disable-next-line no-undef */
      glob: path.join(__dirname, 'css', 'functions', '*.js'),
    },
    'postcss-nested': {},
    'postcss-color-function': {},
    'postcss-preset-env': {},
  },
}
