import mongoose from 'mongoose'

const SuppliesSchema = new mongoose.Schema({
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
	amount: {
		type: Number,
		required: true,
	},
	supply_time: {
		type: Date,
		default: Date.now,
	},
})

export default mongoose.model('Supplies', SuppliesSchema)
