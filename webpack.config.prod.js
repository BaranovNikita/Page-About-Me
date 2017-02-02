const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssNested = require('postcss-nested');

module.exports = {
	entry: './frontend/index.js',
	output: {
		filename: 'bundle.js',
		path: resolve(__dirname, 'dist/assets'),
		publicPath: '/assets/',
	},
	context: resolve(__dirname, 'src'),
	devtool: false,
	module: {
		rules: [
			{
				test: /\.js$/,
				use: ['babel-loader'],
				exclude: /node_modules/,
			},
			{
				test: /\.pcss$/,
				use: ExtractTextPlugin.extract({
					fallbackLoader: 'style-loader',
					loader: 'css-loader?modules!postcss-loader',
				}),
			},
		],
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV),
			},
		}),
		new ExtractTextPlugin('styles.css'),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			minChunks: Infinity,
			filename: 'common.js',
		}),
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: [
					autoprefixer({
						browsers: [
							'last 3 version',
							'ie >= 10',
						],
					}),
					postcssNested(),
				],
				context: './src',
			},
		}),
		new webpack.optimize.UglifyJsPlugin(),
	],
};
