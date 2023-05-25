import moment from 'moment'

import { ProductController, PurchasesController } from '../../../controllers/index.js'

import log from '../../log.js'

const productRating = async (periodStart = moment(0), periodEnd = moment()) => {
	const rating = {}

	const purchases = await PurchasesController.getAll()

	await Promise.all(
		await purchases.map(async (p) => {
			if (
				moment(p.purchase_time).unix() >= moment(periodStart).unix() &&
				moment(periodEnd).unix() >= moment(p.purchase_time).unix()
			) {
				const product = await ProductController.getOneById(p.product)
				// Checking (ONLY FOR TESTING RATING)
				// console.log(product.name, p.amount)

				// Checking (ONLY FOR TESTING UNIQUE PURCHASERS AMOUNT)
				// console.log(product.name, String(p.purchaser))

				if (rating[product.id] === undefined) {
					// About getting purchasers amount
					// 1) Filtering only same product ids (getting array only with same products ids)
					// 2) Mapping to purchaser id only
					// 3) Set this array for only unique purchasers
					const purchasersAmount = new Set(
						purchases.filter((pf) => String(pf.product) === String(p.product)).map((pm) => pm.purchaser)
					).size

					rating[product.id] = {
						name: product.name,
						purchasers_amount: purchasersAmount,
						purchase_amount: purchases.filter((r) => String(r.product) === String(product.id)).length,
						'rating (purchases_number)': p.amount,
					}
				} else {
					rating[product.id]['rating (purchases_number)'] =
						rating[product.id]['rating (purchases_number)'] + p.amount
				}
			}
		})
	)

	const ratingArray = Object.values(rating)

	// In this case sort((a, b) => a.purchasesNumber + b.purchasesNumber)) dont work correctly :p
	if (ratingArray.length > 0)
		console.table(
			ratingArray.sort((a, b) => a['rating (purchases_number)'] - b['rating (purchases_number)']).reverse()
		)
	else
		log.warn(
			`Creating rating table failed or rating not found in the specified period from ${periodStart} to ${periodEnd}`,
			'rating array length equals 0'
		)
}

export default productRating
