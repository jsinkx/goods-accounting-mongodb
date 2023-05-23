import { PurchaserController } from '../../../controllers/index.js'

import log from '../../log.js'

const changePurchaserBalance = async (id, value, fromConsole) => {
	if (!!!id || !!!value) {
		log.error('Expected 2 arguments', 'purchaserId, value')
		return
	}

	value = parseFloat(parseFloat(value).toFixed(2))

	try {
		const purchaser = await PurchaserController.getOneById(id)
		const changedBalance = Number(parseFloat(parseFloat(purchaser.currentBalance) + value).toFixed(2))

		await PurchaserController.update(id, {
			currentBalance: changedBalance,
		})

		fromConsole &&
			log.success(
				`Updated ${purchaser.surname} ${purchaser.firstName} ${
					purchaser.patronymic !== undefined ? purchaser.patronymic : ''
				} balance on ${value} | Current balance: ${changedBalance}`
			)
	} catch (error) {
		log.error(`Failed to change balance for ${id}`, error)
	}
}

export default changePurchaserBalance
