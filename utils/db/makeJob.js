import { PurchaserController, ProductController, ProviderController } from '../../controllers/index.js'
import makePurchase from './procedures/makePurchase.js'
import makeSupply from './procedures/makeSupply.js'
import changeBalance from './procedures/changePurchaserBalance.js'

const makeJob = async () => {
	// Helpers
	const getPurchaserId = async (surname) => (await PurchaserController.getOne({ surname }))._id
	const getProductId = async (name) => (await ProductController.getOne({ name }))._id
	const getProviderId = async (name) => (await ProviderController.getOne({ name }))._id

	// Imitation actions
	await makePurchase(
		await getPurchaserId('Voronin'),
		await getProviderId('Intel'),
		await getProductId('Core i3-12100F OEM'),
		30
	)
	await makeSupply(await getProviderId('Intel'), await getProductId('Core i3-12100F OEM'), 30)
	await makePurchase(
		await getPurchaserId('Kim'),
		await getProviderId('Intel'),
		await getProductId('Core i3-12100F OEM'),
		15
	)
	await makePurchase(
		await getPurchaserId('Kim'),
		await getProviderId('Intel'),
		await getProductId('Core i3-12100F OEM'),
		22
	)
	await makePurchase(
		await getPurchaserId('Ivanov'),
		await getProviderId('AMD'),
		await getProductId('Ryzen 7 5800X OEM'),
		72
	)
	await makePurchase(
		await getPurchaserId('Gaganov'),
		await getProviderId('AMD'),
		await getProductId('Ryzen 5 5600x OEM'),
		1
	)
	await changeBalance(await getPurchaserId('Gaganov'), 700)
	await makePurchase(
		await getPurchaserId('Gaganov'),
		await getProviderId('AMD'),
		await getProductId('Ryzen 7 5800X OEM'),
		3
	)
	await makePurchase(
		await getPurchaserId('Petrov'),
		await getProviderId('MSI'),
		await getProductId('GeForce RTX 370 Ti'),
		5
	)
	await makePurchase(
		await getPurchaserId('Ginda'),
		await getProviderId('DEEPCOOL'),
		await getProductId('VX PLUS 500W'),
		7
	)
	await makePurchase(
		await getPurchaserId('Utkin2'),
		await getProviderId('GIGABYTE'),
		await getProductId('AMD Radeon RX 6600'),
		20
	)
	await makePurchase(
		await getPurchaserId('Shurup'),
		await getProviderId('GIGABYTE'),
		await getProductId('AMD Radeon RX 6600'),
		10
	)
	await makePurchase(
		await getPurchaserId('Ivanov'),
		await getProviderId('Palit'),
		await getProductId('AMD Radeon RX 6600'),
		3000
	)
	await makePurchase(
		await getPurchaserId('Gaganov San SSanich'),
		await getProviderId('Corsair'),
		await getProductId('DQ750'),
		7
	)
	await makePurchase(
		await getPurchaserId('Gaganov SHAD'),
		await getProviderId('Intel'),
		await getProductId('Core i5-12400F'),
		2
	)
	await makeSupply(await getProviderId('Palit'), await getProductId('AMD Radeon RX 6600'), 20)
	await makeSupply(await getProviderId('GIGABYTE'), await getProductId('AMD Radeon RX 6600'), 10)
	await makeSupply(await getProviderId('Intel'), await getProductId('Core i3-12100F OEM'), 30)
	await makePurchase(
		await getPurchaserId('Shurup'),
		await getProviderId('Intel'),
		await getProductId('Core i3-12100F OEM'),
		15
	)
	await changeBalance(await getPurchaserId('Voronin'), 5000)
	await makePurchase(
		await getPurchaserId('Voronin'),
		await getProviderId('Intel'),
		await getProductId('Core i3-12100F OEM'),
		4
	)
	await makeSupply(await getProviderId('AMD'), await getProductId('Ryzen 7 5800X OEM'), 12)
	await makePurchase(
		await getPurchaserId('Voronin'),
		await getProviderId('AMD'),
		await getProductId('Ryzen 7 5800X OEM'),
		7
	)
}

export default makeJob
