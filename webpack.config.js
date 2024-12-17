const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => {
  return {
    mode: env.NODE_ENV || 'production',
    entry: './src/index.js',
    output: {
      filename: 'qurve-sdk.js',
      path: path.resolve(__dirname, 'dist'),
      library: 'QurveLabsSDK',
      libraryTarget: 'umd',
      umdNamedDefine: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new Dotenv({
        path: `./.env.${env.NODE_ENV}`,
      }),
    ],
    resolve: {
      fallback: {
        path: require.resolve('path-browserify'),
        fs: false,
      },
    },
    devServer: {
      static: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000,
    },
  };
};
