import {
	ProductController,
	ProviderController,
	PurchaserController,
	PurchasesController,
} from '../../../controllers/index.js'

import log from '../../log.js'

import changeProductCount from './changeProductCount.js'
import changePurchaserBalance from './changePurchaserBalance.js'

const makePurchase = async (purchaserId, providerId, productId, count) => {
	const provider = await ProviderController.getOne(providerId)

	let purchaser = await PurchaserController.getOne(purchaserId)
	let product = await ProductController.getOne(productId)
	let purchased = 0

	if (count <= 0) {
		log.error('Purchase failed', `Count must be greater than 0 | Given ${count}`)
		return
	}

	for (let i = 0; i < count; i++) {
		if (parseFloat(purchaser.currentBalance) - parseFloat(product.price) < 0) {
			log.error(
				'Purchase failed',
				`insufficient funds on ${purchaser.firstName} ${purchaser.surname}'s balance ${
					purchaser.currentBalance
				}$, price ${parseFloat(product.price)}$`
			)
			break
		}

		if (product.count === 0) {
			log.warn(
				'Empty stock',
				`Purchase failed, current count ${provider.name} ${product.name} (${product.id}) equals 0`
			)
			break
		}

		purchased++

		await changeProductCount(productId, -1)
		await changePurchaserBalance(purchaserId, -product.price)

		// Getting after changing values
		product = await ProductController.getOne(productId)
		purchaser = await PurchaserController.getOne(purchaserId)
	}

	if (purchased === 0) return

	await PurchasesController.create({
		product: productId,
		provider: providerId,
		purchaser: purchaserId,
		amount: purchased,
	})

	log.success(
		`Purchase ${purchaser.firstName} ${purchaser.surname} purchased ${provider.name} ${product.name} in count ${purchased} / ${count} | Stock: ${product.count}`
	)
}

export default makePurchase
