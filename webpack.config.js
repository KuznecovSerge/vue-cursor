const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const env = require('dotenv').config({ path: '.env' }).parsed;

module.exports = {
	entry: {
		main: './src/main.js'
	},
	output: {
		path: path.resolve(__dirname, 'public'),
		publicPath: '/',
		filename: 'javascripts/[name].js',
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['vue-style-loader', 'css-loader']
			},
			{
				test: /\.vue$/,
				use: ['cache-loader', 'vue-loader']
			},
			{
				test: /\.js$/,
				use: ['cache-loader', 'babel-loader'],
				exclude: /node_modules/
			},
			{
				test: /\.s(c|a)ss$/,
				use: [
					'vue-style-loader',
					'css-loader',
					{
						loader: 'sass-loader',
						// Requires sass-loader@^8.0.0
						options: {
							implementation: require('sass'),
							sourceMap: true,
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
					outputPath: 'assets/'
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
	devServer: {
		historyApiFallback: true,
		noInfo: false,
		overlay: true
	},
	performance: {
		hints: false
	},
	devtool: '#eval-source-map'
};

module.exports.plugins = (module.exports.plugins || []).concat([
	new CopyWebpackPlugin([
		{
			from: path.join(__dirname, './assets'),
			to: path.join(__dirname, 'public/assets')
		}
	]),
	new webpack.DefinePlugin({
		env: JSON.stringify(env)
	}),
	new VueLoaderPlugin(),
	new HtmlWebpackPlugin({
		hash: true,
		template: './public/debug/index.html',
		chunks: ['main']
	}),
	new webpack.ContextReplacementPlugin(
		/moment[/\\]locale$/,
		/ru|en/
	),
	// анализатор можно открыть по адресу: http://127.0.0.1:8888/
	new BundleAnalyzerPlugin({ openAnalyzer: false }),
]);
