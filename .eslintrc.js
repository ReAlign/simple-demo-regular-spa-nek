// http://eslint.org/docs/user-guide/configuring

module.exports = {
  extends: 'kaola/esnext',
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // config.add your custom rules here
  'rules': {
    // "arrow-parens": [2, "as-needed"],
    'no-debugger': 0
  },
  'globals': {
    'IS_ONLINE': true,
    'NEKUI': true
  }
}
