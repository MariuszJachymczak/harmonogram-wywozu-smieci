const { override, addWebpackModuleRule } = require("customize-cra");

module.exports = override(
  //SCSS Rules added
  addWebpackModuleRule({
    test: /\.scss$/,
    use: ["style-loader", "css-loader", "sass-loader"],
  })
);
