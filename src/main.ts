import { Command, Helper } from './interfaces';

const command: Command = {
	description: 'create a production ready build of your application',
	register(helper) {
		return helper.yargs;
	},
	run(helper: Helper, args: any) {
		const webpack: any = require('webpack');
		const path: any = require('path');
		const webpackDevServer: any = require('webpack-dev-server');

		const config: any = require('./webpack.config.prod.js');
		config.devtool = 'eval-source-map';
		config.entry.unshift(path.join(__dirname, 'node_modules', 'webpack-dev-server/client?'));

		const compiler = webpack(config);
		const server = new webpackDevServer(compiler, {
			stats: {
				colors: true,
				chunks: false
			}
		});

		return new Promise((resolve, reject) => {
			server.listen(9999, '127.0.0.1', (err: Error) => {
				console.log('Starting server on http://localhost:9999');
				if (err) {
					reject(err);
				}
			});
		});

	}
};

export default command;
