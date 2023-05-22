import mongoose from 'mongoose'
import dotenv from 'dotenv'

import initDB from './utils/db/initDB.js'
import makeJob from './utils/db/makeJob.js'
import { handleSuccessConnect, handleErrorConnect } from './utils/handlers.js'

dotenv.config()

mongoose
	.connect(process.env.DB_ADDRESS)
	.then(handleSuccessConnect)
	.then(async () => {
		await initDB()
		await makeJob()
	})
	.catch(handleErrorConnect)
