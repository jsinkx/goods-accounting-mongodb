import mongoose from 'mongoose'
import dotenv from 'dotenv'

import { handleSuccessConnect, handleErrorConnect } from './utils/handlers.js'

import initDB from './utils/db/initDB.js'
import makeJob from './utils/db/makeJob.js'
import productLifecycle from './utils/db/analytics/productLifecycle.js'
import productRating from './utils/db/analytics/productRating.js'

dotenv.config()

mongoose
	.connect(process.env.DB_ADDRESS)
	.then(handleSuccessConnect)
	.then(async () => {
		// await initDB()
		// await makeJob()
		// await productLifecycle('2023-05-22T21:08:01.448+00:00', '2023-05-22T21:08:02.259+00:00')
		// await productLifecycle()
		// await productRating()
	})
	.catch(handleErrorConnect)
