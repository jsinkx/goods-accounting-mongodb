import mongoose from 'mongoose'
import dotenv from 'dotenv'
import prompt from 'prompt-sync'

import { handleSuccessConnect, handleErrorConnect } from './utils/handlers.js'

// Functions (procedures)
import initDB from './utils/db/initDB.js'
import makeJob from './utils/db/makeJob.js'
import productLifecycle from './utils/db/analytics/productLifecycle.js'
import productRating from './utils/db/analytics/productRating.js'
import makePurchase from './utils/db/procedures/makePurchase.js'
import makeSupply from './utils/db/procedures/makeSupply.js'
import changePurchaserBalance from './utils/db/procedures/changePurchaserBalance.js'

dotenv.config()

mongoose
	.connect(process.env.DB_ADDRESS)
	.then(handleSuccessConnect)
	.then(async () => {
		while (true) {
			const command = prompt({
				sigint: true,
				eot: true,
			})('λ > ')

			// Ctrl + Shift + V for past

			if (command === 'exit') break

			const args = command.split(' ').slice(1)

			if (command.startsWith('initDB')) {
				await initDB()
			} else if (command.startsWith('makeJob')) {
				await makeJob()
			} else if (command.startsWith('makePurchase')) {
				await makePurchase(...args) // Example makePurchase 646bd9ac43bb5102e493491f 646bd9ac43bb5102e49348fd 646bd9ac43bb5102e4934911 5
			} else if (command.startsWith('makeSupply')) {
				await makeSupply(...args) // Example makeSupply 646bd9ac43bb5102e49348fd 646bd9ac43bb5102e4934911 10
			} else if (command.startsWith('changePurchaserBalance')) {
				await changePurchaserBalance(...args, true) // Example changePurchaserBalance 646bd9ac43bb5102e493491f 12.22
			} else if (command.startsWith('productLifecycle')) {
				await productLifecycle(...args) // Example productLifecycle 2023-05-22T21:08:01.448+00:00 2023-05-22T21:08:01.448+00:00
			} else if (command.startsWith('productRating')) {
				await productRating()
			}
		}
	})
	.catch(handleErrorConnect)
