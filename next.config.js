// This file is not going through babel transformation.
// So, we write it in vanilla JS.
// (But you could use ES2015 features supported by your Node.js version)
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { assocPath } = require('ramda');
const path = require('path');

module.exports = {
  webpack: (config, { dev }) => {
    if (process.env.ANALYZE) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: 8888,
          openAnalyzer: true,
        })
      );
    }

    // We are using eslint-loader in webpack to lint only imported modules.
    const eslintRule = {
      test: /\.js$/,
      enforce: 'pre',
      exclude: /node_modules/,
      loader: 'eslint-loader',
      options: {
        // Emit errors as warnings for dev to not break webpack build.
        // Eslint errors are shown in console for dev, yay :-)
        emitWarning: dev,
      },
    };

    const cssRule = {
        test: /\.css$/,
        use: [
          {
            loader: 'emit-file-loader',
            options: {
              name: 'dist/[path][name].[ext].js',
            },
          },
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              extends: path.resolve(__dirname, './.babelrc'),
            },
          },
          'styled-jsx-css-loader',
        ],
      }

    const rules = [].concat(eslintRule, config.module.rules, cssRule);
    return assocPath(['module', 'rules'], rules, config);
  },
};
