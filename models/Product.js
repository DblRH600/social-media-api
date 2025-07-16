import mongoose from 'mongoose'

const { Schema } = mongoose

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0, max: 500 },
  category: { type: String, required: true }
})

export default mongoose.model('Product', productSchema)
