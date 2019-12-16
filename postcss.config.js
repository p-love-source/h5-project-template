module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-plugin-px2rem': {
      rootValue: 37.5,
      unitPrecision: 5,
      propWhiteList: [],
      propBlackList: [],
      exclude: false,
      selectorBlackList: ['noRem'],
      ignoreIdentifier: false,
      replace: true,
      mediaQuery: false,
      minPixelValue: 2
    }
  }
}
