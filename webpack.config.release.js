const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const env = require('dotenv').config({ path: '.env' }).parsed;

module.exports = {
	entry: {
		main: './src/main.js',
	},
	output: {
		path: path.resolve(__dirname, '../server/public'),
		publicPath: '/',
		filename: 'javascripts/[name].js',
		chunkFilename: 'javascripts/[name].js',
	},
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['vue-style-loader', 'css-loader']
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {}
					// other vue-loader options go here
				}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.s(c|a)ss$/,
				use: [
					'vue-style-loader',
					'css-loader',
					{
						loader: 'sass-loader',
						// Requires sass-loader@^7.0.0
						options: {
							implementation: require('sass'),
							fiber: require('fibers'),
							indentedSyntax: true // optional
						},
						// Requires sass-loader@^8.0.0
						options: {
							implementation: require('sass'),
							sassOptions: {
								fiber: require('fibers'),
								indentedSyntax: true // optional
							}
						}
					}
				]
			},
			{
				test: /\.less$/,
				use: [
					'vue-style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'less-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'style-resources-loader',
						options: {
							patterns: [
								path.resolve(__dirname, 'src/styles/index.less')
							]
						}
					}
				]
			},
			{
				test: /\.(png|jpg|gif|svg|ttf|otf|eot|woff2?)(\?.*)?$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]?[hash]',
					outputPath: 'assets',
					publicPath: '/public/assets'
				}
			}
		]
	},
	resolve: {
		alias: {
			vue$: 'vue/dist/vue.esm.js',
			'@': path.join(__dirname, './src')
		},
		extensions: ['*', '.js', '.vue', '.json']
	},
	performance: {
		hints: false
	},
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin()]
	}
};
module.exports.plugins = (module.exports.plugins || []).concat([
	new CopyWebpackPlugin([
		{
			from: path.join(__dirname, './assets'),
			to: path.resolve(__dirname, '../server/public/assets')
		}
	]),
	new webpack.DefinePlugin({
		env: JSON.stringify(env),
		'process.env': {
			NODE_ENV: '"production"',
			HOST: `'${env.BACKEND_URI}'` || process.env.HOST
		}
	}),
	new VueLoaderPlugin(),
	new HtmlWebpackPlugin({
		hash: true,
		template: './public/index.html',
		chunks: ['main']
	}),
	new webpack.ContextReplacementPlugin(
		/moment[/\\]locale$/,
		/ru|en/
	),
]);
