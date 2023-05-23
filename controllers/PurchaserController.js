import PurchaserModel from '../models/Purchaser.js'

import log from '../utils/log.js'

export const create = async (params) => {
	const { surname, firstName, patronymic, currentBalance } = params

	try {
		const doc = new PurchaserModel({
			surname,
			firstName,
			patronymic,
			currentBalance: currentBalance.toFixed(2),
		})

		const purchaser = await doc.save()

		log.success(
			`Purchaser ${purchaser.firstName} ${purchaser.surname} ${
				purchaser?.patronymic !== undefined ? purchaser?.patronymic : ''
			} (${purchaser._id}) created`
		)
	} catch (error) {
		log.err(`${error.name} at PurchaserController.create`, error)
	}
}

export const remove = async (id) => {
	try {
		await PurchaserModel.findByIdAndDelete(id)

		log.success(`Purchaser ${id} removed`)
	} catch (error) {
		log.error(`${error?.name} at PurchaserController.remove`, error)
	}
}

export const update = async (id, params) => {
	try {
		await PurchaserModel.updateOne(
			{
				_id: id,
			},
			params
		)
	} catch (error) {
		log.error(`${error.name} at PurchaserController.update`, error)
	}
}

export const getOneById = async (id) => await PurchaserModel.findById(id)

export const getOne = async (params) => await PurchaserModel.findOne(params)

export const getAll = async () => await PurchaserModel.find({})
