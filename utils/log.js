import chalk from 'chalk'

const log = {
	success: function (title) {
		console.log(chalk.green(`[Success] ${title}`))
	},
	error: function (title, error) {
		console.log(chalk.red(`[Error] ${title}:`, error))
	},
	warn: function (title, warn) {
		console.log(chalk.yellow(`[Warning] ${title}:`, warn))
	},
}

export default log
