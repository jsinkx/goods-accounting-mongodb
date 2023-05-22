import ProviderModel from '../models/Provider.js'

import log from '../utils/log.js'

export const create = async (params) => {
	const { name, city } = params

	try {
		const doc = new ProviderModel({
			name,
			city,
		})

		const provider = await doc.save()

		log.success(`Provider ${provider.name} | ${provider.city} (${provider._id}) created`)
	} catch (error) {
		log.error(`${error.name} at ProviderController.create`, error)
	}
}

export const remove = async (id) => {
	try {
		await ProviderModel.findByIdAndDelete(id)

		log.success(`Provider ${id} removed`)
	} catch (error) {
		log.error(`${error.name} at ProviderController.remove`, error)
	}
}

export const update = async (id, params) => {
	try {
		await ProviderModel.updateOne(
			{
				_id: id,
			},
			params
		)
	} catch (error) {
		log.error(`${error.name} at ProviderController.update`, error)
	}
}

export const getOneById = async (id) => await ProviderModel.findById(id)

export const getOne = async (params) => await ProviderModel.findOne(params)

export const getAll = async () => await ProviderModel.find({})
