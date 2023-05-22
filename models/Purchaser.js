import mongoose from 'mongoose'

const PurchaserSchema = new mongoose.Schema({
	surname: {
		type: String,
		required: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	patronymic: {
		type: String,
		required: false,
	},
	currentBalance: {
		type: mongoose.Types.Decimal128,
		required: true,
	},
})

export default mongoose.model('Purchaser', PurchaserSchema)
