import webpack from 'webpack';

export default {
  context: new URL('./src/app', import.meta.url).pathname,
  entry: './entry',
  output: {
    path: new URL('./public/javascripts', import.meta.url).pathname,
    filename: 'bundle.js',
  },
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  resolve: {
    fallback: {
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      vm: 'vm-browserify',
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
};
