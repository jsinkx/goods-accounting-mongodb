import moment from 'moment'

import {
	ProductController,
	PurchaserController,
	PurchasesController,
	ProviderController,
	SuppliesController,
} from '../../../controllers/index.js'

import log from '../../log.js'

const turnover = {}

const productTurnover = async (periodStart = moment(0), periodEnd = moment()) => {
	// Supplies
	const supplies = await SuppliesController.getAll()

	await Promise.all(
		await supplies.map(async (s) => {
			if (
				moment(s.supply_time).unix() >= moment(periodStart).unix() &&
				moment(periodEnd).unix() >= moment(s.supply_time).unix()
			) {
				const product = await ProductController.getOneById(s.product)
				const provider = await ProviderController.getOneById(s.provider)

				if (turnover[product.id] === undefined) {
					turnover[product.id] = {
						name: product.name,
						supplies_sum: -s.amount,
						purchases_sum: 0,
						providers: [provider.name],
						purchasers: [],
						profit: 0,
					}
				} else {
					turnover[product.id].providers.push(provider.name)
					turnover[product.id].supplies_sum = turnover[product.id].supplies_sum - s.amount
				}
			}
		})
	)

	// Purchases
	const purchases = await PurchasesController.getAll()

	await Promise.all(
		await purchases.map(async (p) => {
			if (
				moment(p.purchase_time).unix() >= moment(periodStart).unix() &&
				moment(periodEnd).unix() >= moment(p.purchase_time).unix()
			) {
				const product = await ProductController.getOneById(p.product)
				const provider = await ProviderController.getOneById(p.provider)
				const purchaser = await PurchaserController.getOneById(p.purchaser)

				if (turnover[product.id] === undefined) {
					turnover[product.id] = {
						name: product.name,
						supplies_sum: 0,
						purchases_sum: p.amount,
						providers: [provider.name],
						purchasers: [
							`${purchaser.surname} ${purchaser.firstName}${
								purchaser.patronymic !== undefined ? ' ' + purchaser.patronymic : ''
							}`,
						],
						profit: p.amount * product.price,
					}
				} else {
					turnover[product.id].purchases_sum = turnover[product.id].purchases_sum + p.amount
					turnover[product.id].profit = turnover[product.id].profit + p.amount * product.price
					turnover[product.id].providers.push(provider.name)
					turnover[product.id].purchasers.push(
						`${purchaser.surname} ${purchaser.firstName}${
							purchaser.patronymic !== undefined ? ' ' + purchaser.patronymic : ''
						}`
					)
				}
			}
		})
	)

	const turnoverArray = Object.values(turnover).map((t) => ({
		name: t.name,
		supplies_sum: t.supplies_sum,
		providers: Array.from(new Set(t.providers)).join(', '),
		purchases_sum: t.purchases_sum,
		purchasers: Array.from(new Set(t.purchasers)).join(', '),
		profit: Number(parseFloat(t.profit).toFixed(2)),
	}))

	// In this case sort((a, b) => a.purchasesNumber + b.purchasesNumber)) dont work correctly :p
	if (turnoverArray.length > 0) console.table(turnoverArray.sort((a, b) => a.profit - b.profit).reverse())
	else log.warn('Turnover not found in the specified period', `from ${periodStart} to ${periodEnd}`)
}

export default productTurnover
