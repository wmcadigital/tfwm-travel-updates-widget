// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function (config, env) {
    config.optimization.runtimeChunk = false;
    config.optimization.splitChunks = {
      cacheGroups: {
        default: false,
      },
    };

    // JS
    config.output.filename = 'static/js/build.min.js';
    // CSS remove MiniCssPlugin
    // config.plugins = config.plugins.filter(plugin => !(plugin instanceof MiniCssExtractPlugin));
    // // CSS replaces all MiniCssExtractPlugin.loader with style-loader
    // config.module.rules[2].oneOf = config.module.rules[2].oneOf.map(rule => {
    //   if (!rule.hasOwnProperty('use')) return rule;
    //   return Object.assign({}, rule, {
    //     use: rule.use.map(options =>
    //       /mini-css-extract-plugin/.test(options.loader)
    //         ? { loader: require.resolve('style-loader'), options: {} }
    //         : options
    //     ),
    //   });
    // });

    config.resolve.alias = {
      ...config.resolve.alias,
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
    };
    // ...add your webpack config
    return config;
  },
};
