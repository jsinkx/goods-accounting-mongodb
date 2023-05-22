import PurchasesModel from '../models/Purchases.js'

import log from '../utils/log.js'

export const create = async (params) => {
	const { product, provider, purchaser, amount, purchase_time } = params

	try {
		const doc = new PurchasesModel({
			product,
			provider,
			purchaser,
			amount,
			purchase_time,
		})

		await doc.save()
	} catch (error) {
		log.error(`${error?.name} at PurchasesController.create`, error)
	}
}

export const remove = async (id) => {
	try {
		await PurchasesModel.findByIdAndDelete(id)

		log.success(`Purchase ${id} removed`)
	} catch (error) {
		log.err(`${error.name} at PurchasesController.remove`, error)
	}
}

export const getAll = async () => await PurchasesModel.find({})
