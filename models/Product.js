import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	count: {
		type: Number,
		required: true,
	},
	price: {
		type: mongoose.Types.Decimal128,
		required: true,
	},
})

export default mongoose.model('Product', ProductSchema)
