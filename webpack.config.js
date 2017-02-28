const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./src/server/config');

const ENV = process.env.NODE_ENV || 'default';
module.exports = {
	entry: [
		'react-hot-loader/patch',
		'./frontend/index.js',
	],
	output: {
		filename: 'bundle.js',
		path: resolve(__dirname, 'dist/assets'),
		publicPath: '/assets/',
	},
	context: resolve(__dirname, 'src'),
	devtool: 'inline-source-map',
	devServer: {
		hot: true,
		contentBase: resolve(__dirname, 'dist'),
		publicPath: '/assets/',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: ['babel-loader', 'eslint-loader'],
				exclude: /node_modules/,
			},
			{
				test: /\.p?css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader?modules!postcss-loader',
				}),
				include: /.src/,
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader!postcss-loader',
				}),
				include: /node_modules/
			},
			{ test: /\.gif$/, use: 'url-loader?limit=10000&mimetype=image/gif' },
			{ test: /\.jpg$/, use: 'url-loader?limit=10000&mimetype=image/jpg' },
			{ test: /\.png$/, use: 'url-loader?limit=10000&mimetype=image/png' },
			{ test: /\.svg/, use: 'url-loader?limit=26000&mimetype=image/svg+xml' },
			{ test: /\.(woff|woff2|ttf|eot|otf)/, use: 'url-loader?limit=1' }
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new ExtractTextPlugin('styles.css'),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			minChunks: Infinity,
			filename: 'common.js',
		}),
		new webpack.LoaderOptionsPlugin({
			options: {
				eslint: { configFile: './.eslintrc' },
				context: './src',
			},
		}),
		new webpack.DefinePlugin({
			'process.env': {
				ADMIN_EMAIL: JSON.stringify(config.get(`${ENV}:ADMIN_EMAIL`))
			}
		})
	],
};
