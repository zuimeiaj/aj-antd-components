const path = require('path')
const glob = require('glob')
const pkg = require('./package.json')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 不需要打包的库，第二个参数为cdn加载时的全局变量名称
const externals = [
  ['vue', 'Vue'],
  ['ant-design-vue', 'antd'],
  ['viewerjs', 'viewerjs'],
  ['v-viewer', 'v-viewer'],
  ['decimal.js', 'decimal.js'],
  ['vue-clipboard2', 'vue-clipboard2'],
  ['file-saver', 'file-saver'],
  ['debounce', 'debounce'],
  ['currencyformatter.js', 'currencyformatter.js'],
  ['vuex', 'vuex'],
  ['wangeditor', 'wangeditor'],
]

function getComponents() {
  const files = glob.sync(path.resolve(__dirname, 'lib/components/index.js'))
  const resultMap = {}
  for (let filePath of files) {
    const name = filePath.split(/(\\|\/)/).reverse()[2]
    resultMap[name] = filePath
  }
  resultMap['index'] = resultMap['components']
  delete resultMap['components']
  return resultMap
}

function getExternals() {
  const exter = externals.reduce((reuslt, lib) => {
    reuslt[lib[0]] = {
      amd: lib[0],
      commonjs: lib[0],
      commonjs2: lib[0],
      root: lib[1],
    }
    return reuslt
  }, {})
  return exter
}
const ExtractCss = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    publicPath: path.resolve(__dirname, '/dist'),
  },
}
module.exports = {
  mode: 'production',
  entry: getComponents(),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: pkg.name,
    libraryExport: 'default',
  },
  externals: getExternals(),
  module: {
    rules: [
      { test: /\.vue$/, use: 'vue-loader' },
      { test: /\.css$/, use: [ExtractCss, 'css-loader'] },
      {
        test: /\.less$/,
        use: [ExtractCss, 'css-loader', 'less-loader'],
        exclude: /node_modules/,
      },
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new VueLoaderPlugin(),
  ],
}
