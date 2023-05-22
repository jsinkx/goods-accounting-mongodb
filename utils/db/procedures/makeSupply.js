import { ProductController, SuppliesController } from '../../../controllers/index.js'

import log from '../../log.js'

import changeProductCount from './changeProductCount.js'

const makeSupply = async (providerId, productId, count) => {
	await changeProductCount(productId, count)

	await SuppliesController.create({
		product: productId,
		provider: providerId,
		amount: count,
	})

	const product = await ProductController.getOne(productId)

	log.success(`Supply ${product.name} made in count ${count} | Stock: ${product.count}`)
}

export default makeSupply
