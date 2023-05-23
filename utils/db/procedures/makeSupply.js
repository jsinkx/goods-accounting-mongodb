import { ProductController, ProviderController, SuppliesController } from '../../../controllers/index.js'

import log from '../../log.js'

import changeProductCount from './changeProductCount.js'

const makeSupply = async (providerId, productId, count) => {
	if (!!!providerId || !!!productId || !!!count) {
		log.error('Expected 3 arguments', 'providerId, productId, count')
		return
	}

	count = Number(count)
	const provider = await ProviderController.getOneById(providerId)

	await changeProductCount(productId, count)

	await SuppliesController.create({
		product: productId,
		provider: providerId,
		amount: count,
	})

	const product = await ProductController.getOne({ _id: productId })

	log.success(`Supply ${provider.name} ${product.name} made in count ${count} | Stock: ${product.count}`)
}

export default makeSupply
