import moment from 'moment'

import {
	ProductController,
	PurchaserController,
	PurchasesController,
	ProviderController,
	SuppliesController,
} from '../../../controllers/index.js'

import log from '../../log.js'

const productLifecycle = async (periodStart = moment(0), periodEnd = moment()) => {
	const lifecycle = []

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

				// Checking (ONLY FOR TESTING)
				// console.log(moment(periodStart).unix(), moment(s.supply_time).unix(), moment(periodEnd).unix())

				lifecycle.push({
					product: product.name,
					name: provider.name,
					date: moment(s.supply_time).format('MMMM Do YYYY, h:mm:ss:ms a'),
					timestamp: moment(s.supply_time).unix(),
					amount: s.amount,
					price: parseFloat(-product.price),
				})
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
				const purchaser = await PurchaserController.getOneById(p.purchaser)

				// Checking (ONLY FOR TESTING)
				// console.log(moment(periodStart).unix(), moment(p.purchase_time).unix(), moment(periodEnd).unix())

				lifecycle.push({
					product: product.name,
					name: `${purchaser.surname} ${purchaser.firstName}${
						purchaser.patronymic !== undefined ? ' ' + purchaser.patronymic : ''
					}`,
					date: moment(p.purchase_time).format('MMMM Do YYYY, h:mm:ss:ms a'),
					timestamp: moment(p.purchase_time).unix(),
					amount: p.amount,
					price: parseFloat(product.price),
				})
			}
		})
	)

	if (lifecycle.length > 0) console.table(lifecycle.sort((a, b) => a.timestamp - b.timestamp))
	else
		log.warn('Purchases or supplies not found in the specified period', `from ${periodStart} to ${periodEnd}`)
}

export default productLifecycle
