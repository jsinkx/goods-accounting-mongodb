import { PurchaserController } from '../../../controllers/index.js'

import log from '../../log.js'

const changePurchaserBalance = async (id, value) => {
	try {
		const purchaser = await PurchaserController.getOneById(id)

		await PurchaserController.update(id, {
			currentBalance: (parseFloat(purchaser.currentBalance) + parseFloat(value)).toFixed(2),
		})
	} catch (error) {
		log.error(`Failed to change balance for ${id}`, error)
	}
}

export default changePurchaserBalance
