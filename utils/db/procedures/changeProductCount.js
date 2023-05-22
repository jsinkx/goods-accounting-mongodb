import { ProductController } from '../../../controllers/index.js'

import log from '../../log.js'

const changeProductCount = async (id, value) => {
	try {
		const product = await ProductController.getOneById(id)

		await ProductController.update(id, {
			count: product.count + value,
		})
	} catch (error) {
		log.error(`Failed to change count for ${id}`, error)
	}
}

export default changeProductCount
