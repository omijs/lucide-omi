const babel = require('@babel/core')

module.exports = function transform(svgString) {
  return babel.transformSync(svgString, {
    plugins: [
      [
        '@babel/plugin-transform-react-jsx',
        {
          pragma: 'h',
          pragmaFrag: 'h.f',
        },
      ],
    ],
  }).code
}
