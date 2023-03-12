const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: {
		index: path.resolve(__dirname, '../src/entry/main.ts'),
		mobile: path.resolve(__dirname, '../src/entry/mobile.ts'),
		rtc: path.resolve(__dirname, '../src/entry/rtc.ts'),
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: './js/[name].[hash].js',
	},
	resolve: {
		extensions: ['.js', '.styl', '.ts'],
		alias: {
			'@parchment': path.resolve(__dirname, '../src/plugins/parchment'),
		},
	},
	// devtool: 'eval-source-map',
	devtool: 'eval-cheap-module-source-map',
	devServer: {
		host: '0.0.0.0',
		contentBase: path.join(__dirname, '../public'),
		hot: true,
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.styl$/,
				include: [path.resolve(__dirname, 'src/plugins/quill/assets')],
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'stylus-loader',
				],
			},
			{
				test: /\.svg$/,
				include: [path.resolve(__dirname, 'src/plugins/quill/assets')],
				use: [
					{
						loader: 'html-loader',
						options: {
							minimize: true,
						},
					},
				],
			},
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'ts-loader',
					},
				],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
					},
				],
			},
			{
				test: /\.vue$/,
				use: ['vue-loader'],
				exclude: /node_modules/,
			},
			{
				test: /\.(jpg|png|gif|woff|woff2|svg|ttf|eot)$/,
				use: ['url-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, '../public/index.html'),
			chunks: ['index'],
		}),
		new HtmlWebpackPlugin({
			filename: 'mobile.html',
			template: path.resolve(__dirname, '../public/mobile.html'),
			chunks: ['mobile'],
		}),
		new HtmlWebpackPlugin({
			filename: 'rtc.html',
			template: path.resolve(__dirname, '../public/rtc.html'),
			chunks: ['rtc'],
		}),
		new VueLoaderPlugin(),
		new CleanWebpackPlugin({
			root: path.resolve(__dirname, './dist'),
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash].css',
			ignoreOrder: true,
		}),
	],
};
