const webpack = require('webpack');
const RequirePlugin = require('umd-compat-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const basePath = process.cwd();

module.exports = {
	entry: path.join(basePath, 'src/main.ts'),
	devtool: 'source-map',
	target: 'node',
	resolve: {
		root: [ basePath ],
		extensions: ['', '.ts', '.tsx', '.js']
	},
	resolveLoader: {
		root: [ path.join(__dirname, "node_modules") ]
	},
	module: {
		unknownContextRegExp: /$^/,
		unknownContextCritical: false,
		exprContextRegExp: /$^/,
		exprContextCritical: false,
		loaders: [
			{ test: /src\/.*\.ts?$/, loader: 'ts-loader' }
		]
	},
	plugins: [
		new CopyWebpackPlugin([
			{ context: 'src', from: '**/*', ignore: '*.ts' },
		]),
		new RequirePlugin(),
		new webpack.BannerPlugin('require = function () {};', { raw: true, entryOnly: true }),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }}),
		new HtmlWebpackPlugin ({
			inject: true,
			template: 'src/index.html'
		})
	],
	output: {
		path: './dist',
		filename: 'main.js',
	}
};
