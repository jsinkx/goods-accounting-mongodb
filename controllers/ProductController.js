import ProductModel from '../models/Product.js'

import log from '../utils/log.js'

export const create = async (params) => {
	const { name, count, price } = params

	try {
		const doc = new ProductModel({
			name,
			count,
			price,
		})

		const product = await doc.save()

		log.success(`Product ${product.name} x ${product.count} | ${product.price}$ (${product._id}) created`)
	} catch (error) {
		log.error(`${error.name} at ProductController.create`, error)
	}
}

export const remove = async (id) => {
	try {
		await ProductModel.findByIdAndDelete(id)

		log.success(`Product ${id} removed`)
	} catch (error) {
		log.error(`${error.name} at ProductController.remove`, error)
	}
}

export const update = async (id, params) => {
	try {
		await ProductModel.updateOne(
			{
				_id: id,
			},
			params
		)
	} catch (error) {
		log.error(`${error.name} at ProductController.update`, error)
	}
}

export const getOneById = async (id) => await ProductModel.findById(id)

export const getOne = async (params) => await ProductModel.findOne(params)

export const getAll = async () => await ProductModel.find({})
