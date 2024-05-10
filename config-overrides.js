const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const TerserPlugin = require('terser-webpack-plugin'); 

module.exports = function override(config, env) {
  // Do not split code into chunks
  config.optimization.splitChunks = {
    cacheGroups: {
      default: false,
    },
  };
  config.optimization.runtimeChunk = false;

  // Disable source map generation
  config.devtool = false;

  // Change output filename and set the path to the root directory
  config.output = {
    ...config.output,
    filename: 'main_prod.js', 
    path: path.resolve(__dirname)
  };

  // Minimization configuration to prevent license file generation
  config.optimization.minimizer = [
    new TerserPlugin({
      terserOptions: {
        format: {
          comments: false,  // Disable extracting comments to .LICENSE files
        },
      },
      extractComments: false,  // Do not extract comments to separate file
    }),
  ];

  // Remove plugins generating unwanted files
  config.plugins = config.plugins.filter(plugin => 
    !(plugin instanceof WebpackManifestPlugin) && !(plugin instanceof HtmlWebpackPlugin)
  );

  return config;
};
