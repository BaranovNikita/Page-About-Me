const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssNested = require('postcss-nested');
const config = require('./src/server/config');

const ENV = process.env.NODE_ENV || 'default';
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
				test: /\.p?css$/,
				use: ExtractTextPlugin.extract({
					fallbackLoader: 'style-loader',
					loader: 'css-loader?modules!postcss-loader',
				}),
				include: /.src/,
				exclude: /node_modules/
			},
			{ test: /\.gif$/, use: 'url-loader?limit=10000&mimetype=image/gif' },
			{ test: /\.jpg$/, use: 'url-loader?limit=10000&mimetype=image/jpg' },
			{ test: /\.png$/, use: 'url-loader?limit=10000&mimetype=image/png' },
			{ test: /\.svg/, use: 'url-loader?limit=26000&mimetype=image/svg+xml' },
			{ test: /\.(woff|woff2|ttf|eot|otf)/, use: 'url-loader?limit=1' }
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
		new webpack.DefinePlugin({
			'process.env': {
				ADMIN_EMAIL: JSON.stringify(config.get(`${ENV}:ADMIN_EMAIL`))
			}
		})
	],
};
