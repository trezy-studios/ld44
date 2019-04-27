module.exports = {
  linters: {
    '**/*.+(js|css)': [
      'eslint --fix',
      'git add',
    ],
  },
}
