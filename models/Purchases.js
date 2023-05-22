import mongoose from 'mongoose'

const PurchasesSchema = new mongoose.Schema({
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product',
		required: true,
	},
	provider: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Provider',
		required: true,
	},
	purchaser: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Purchaser',
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	purchase_time: {
		type: Date,
		default: Date.now,
	},
})

export default mongoose.model('Purchases', PurchasesSchema)
