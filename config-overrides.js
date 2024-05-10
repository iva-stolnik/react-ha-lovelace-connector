const path = require('path');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

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
    filename: 'index.js',
    path: path.resolve(__dirname)
  };

  // Remove HtmlWebpackPlugin to stop generating index.html
  config.plugins = config.plugins.filter(plugin => !(plugin instanceof WebpackManifestPlugin));

  // Adjust or remove plugins that generate asset-manifest.json and other unwanted files
  // This requires knowledge of what plugins are in use that generate these files

  return config;
};
