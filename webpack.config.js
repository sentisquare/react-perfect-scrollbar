const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const env = process.env.NODE_ENV;
const libraryName = '[name]';

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(env),
  }),
];

let outputFile;
if (env === 'production') {
  outputFile = `${libraryName}.min.js`;
  plugins.push(new MiniCssExtractPlugin({
    filename: 'css/styles.min.css',
  }));
} else {
  outputFile = `${libraryName}.js`;
  plugins.push(new MiniCssExtractPlugin({
    filename: 'css/styles.css',
  }));
}

module.exports = {

  mode: env === 'production' ? 'production' : 'development',

  entry: {
    'react-perfect-scrollbar': [
      path.join(__dirname, '/src/index.js'),
      path.join(__dirname, '/src/styles.scss'),
    ],
  },

  devtool: 'source-map',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: outputFile,
    library: {
      name: libraryName,
      type: 'umd',
    },
    globalObject: 'this',
  },

  resolve: {
    modules: [
      path.join(__dirname, './'),
      'node_modules',
    ],

    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },

  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
    },
    {
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
      },
    },
    {
      'prop-types': {
        root: 'PropTypes',
        commonjs2: 'prop-types',
        commonjs: 'prop-types',
        amd: 'prop-types',
      },
    },
  ],

  plugins,
};
