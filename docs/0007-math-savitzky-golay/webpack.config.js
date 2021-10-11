module.exports = {
  mode: 'production',
  entry: './mychart-1.js',
  output: {
    path: `${__dirname}/`,
    filename: 'mychart.min.js',
  },
  devServer: {
    contentBase: './',
  },
}
