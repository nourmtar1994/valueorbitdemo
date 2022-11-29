const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#00417e",
              "@link-color": "#00417e",
              "@layout-header-background": "#28d6fd",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
