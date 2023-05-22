import SuppliesModel from '../models/Supplies.js'

import log from '../utils/log.js'

export const create = async (params) => {
	const { product, provider, amount, supply_time } = params

	try {
		const doc = new SuppliesModel({
			product,
			provider,
			amount,
			supply_time,
		})

		await doc.save()
	} catch (error) {
		log.error(`${error.name} at SuppliesController.create`, err)
	}
}

export const remove = async (id) => {
	try {
		await SuppliesModel.findByIdAndDelete(id)

		log.success(`Supply ${id} removed`)
	} catch (error) {
		log.error(`${error.name} at SuppliesController.remove`, error)
	}
}

export const getAll = async () => await SuppliesModel.find({})
