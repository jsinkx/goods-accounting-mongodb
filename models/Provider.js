import mongoose from 'mongoose'

const ProviderSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
})

export default mongoose.model('Provider', ProviderSchema)
