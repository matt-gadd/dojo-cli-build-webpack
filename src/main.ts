import { Command, Helper } from './interfaces';

const command: Command = {
	description: 'create a production ready build of your application',
	register(helper) {
		return helper.yargs;
	},
	run(helper: Helper, args: any) {
		const webpack: any = require('webpack');
		const config: any = require('./webpack.config.prod.js');

		const compiler = webpack(config);

		return new Promise((resolve) => {
			compiler.run((err: any, stats: any) => {
				console.log(stats.toString({
					chunks: false,
					colors: true
				}));
				resolve({});
			});
		});
	}
};

export default command;
