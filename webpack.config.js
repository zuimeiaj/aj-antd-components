const path = require("path");
const glob = require("glob");
const pkg = require("./package.json");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

// 不需要打包的库，第二个参数为cdn加载
const externals = [
  ["vue", "Vue"],
  ["element-ui", "ElementUI"],
];

function getComponents() {
  const files = glob.sync(path.resolve(__dirname, "lib/**/index.js"));
  const resultMap = {};
  for (let filePath of files) {
    const name = filePath.split(/(\\|\/)/).reverse()[2];

    resultMap[name] = filePath;
  }
  resultMap["index"] = resultMap["components"];
  delete resultMap["components"];
  console.log(resultMap);
  return resultMap;
}

function getExternals() {
  return externals.reduce((reuslt, lib) => {
    reuslt[lib] = {
      amd: lib[0],
      commonjs: lib[0],
      root: lib[1],
    };
    return reuslt;
  }, {});
}

module.exports = {
  mode: "production",
  entry: getComponents(),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].umd.js",
    libraryTarget: "umd",
    library: pkg.name,
    libraryExport: "default",
  },
  externals: getExternals(),
  module: {
    rules: [
      { test: /\.vue$/, use: "vue-loader" },
      { test: /\.css$/, use: "css-loader" },
      { test: /\.less$/, use: "less-loader" },
      { test: /\.js$/, use: "babel-loader", exclude: /node_modules/ },
    ],
  },

  plugins: [new VueLoaderPlugin()],
};
