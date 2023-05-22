import {
	PurchaserController,
	ProductController,
	ProviderController,
	PurchasesController,
	SuppliesController,
} from './../../controllers/index.js'

import products from '../../data/products.json' assert { type: 'json' }
import providers from '../../data/providers.json' assert { type: 'json' }
import purchasers from '../../data/purchasers.json' assert { type: 'json' }

const initDB = async () => {
	// Removing existing
	const removeAllPurchasers = async () => {
		await PurchaserController.getAll().then(async (purchasers) => {
			await Promise.all(purchasers.map(async (p) => await PurchaserController.remove(p._id)))
		})
	}

	const removeAllProducts = async () => {
		await ProductController.getAll().then(async (products) => {
			await Promise.all(products.map(async (p) => await ProductController.remove(p._id)))
		})
	}

	const removeAllProviders = async () => {
		await ProviderController.getAll().then(async (providers) => {
			await Promise.all(providers.map(async (p) => await ProviderController.remove(p._id)))
		})
	}

	const removeAllPurchases = async () => {
		await PurchasesController.getAll().then(async (purchases) => {
			await Promise.all(purchases.map(async (p) => await PurchasesController.remove(p._id)))
		})
	}

	const removeAllSupplies = async () => {
		await SuppliesController.getAll().then(async (supplies) => {
			await Promise.all(supplies.map(async (s) => await SuppliesController.remove(s._id)))
		})
	}

	await removeAllPurchasers()
	await removeAllProducts()
	await removeAllProviders()
	await removeAllPurchases()
	await removeAllSupplies()

	// Adding static (init) data
	await Promise.all(providers.providers.map(async (p) => await ProviderController.create(p)))
	await Promise.all(products.products.map(async (p) => await ProductController.create(p)))
	await Promise.all(purchasers.purchasers.map(async (p) => await PurchaserController.create(p)))
}

export default initDB
