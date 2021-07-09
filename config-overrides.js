// const { override, addWebpackAlias, disableChunk } = require('customize-cra');

// module.exports = override(
//   addWebpackAlias({
//     react: 'preact/compat',
//     'react-dom/test-utils': 'preact/test-utils',
//     'react-dom': 'preact/compat',
//   }),

//   disableChunk()
// );

module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function (config, env) {
    // const config = {
    //   //...snip
    //   resolve: {
    //     alias: {
    //       react: 'preact/compat',
    //       'react-dom/test-utils': 'preact/test-utils',
    //       'react-dom': 'preact/compat',
    //       // Must be below test-utils
    //     },
    //   },
    // };

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
