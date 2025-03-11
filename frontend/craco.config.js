const fs = require("fs");
const evalSourceMap = require("react-dev-utils/evalSourceMapMiddleware");
const redirectServedPath = require("react-dev-utils/redirectServedPathMiddleware");
const noopServiceWorker = require("react-dev-utils/noopServiceWorkerMiddleware");
const webpack = require("webpack");
const CracoAlias = require("craco-alias");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      console.log()
      // Add Node.js module polyfills for browser compatibility
      webpackConfig.resolve.fallback = {
        assert: require.resolve("assert"),
        buffer: require.resolve("buffer"),
        stream: require.resolve("stream-browserify"),
      };

      webpackConfig.plugins = [
        ...(webpackConfig.plugins || []),
        new webpack.ProvidePlugin({
          Buffer: ["buffer", "Buffer"],
        }),
      ];

      return {
        ...webpackConfig,
        ignoreWarnings: [/Failed to parse source map/],
      };
    },
  },
  style: {
    css: {
      preprocessorOptions: {
        sass: {
          api: 'modern',
        },
      },
    },
  },
  devServer: (devServerConfig, { env, paths }) => {
    // Extend the devServer configuration
    devServerConfig = {
      devMiddleware: {
        publicPath: "/ui/",
        writeToDisk: true,
      },
      onBeforeSetupMiddleware: undefined,
      onAfterSetupMiddleware: undefined,
      setupMiddlewares: (middlewares, devServer) => {
        if (!devServer) {
          throw new Error("webpack-dev-server is not defined");
        }

        if (fs.existsSync(paths.proxySetup)) {
          require(paths.proxySetup)(devServer.app);
        }

        middlewares.push(
          evalSourceMap(devServer),
          redirectServedPath(paths.publicUrlOrPath),
          noopServiceWorker(paths.publicUrlOrPath)
        );

        return middlewares;
      },
    };
    return devServerConfig;
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        baseUrl: ".",
        tsConfigPath: "./tsconfig.json",
      },
    },
  ],
};
