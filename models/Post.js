import mongoose from 'mongoose'

const { Schema } = mongoose

const postSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  body: { type: String, required: true },
  comments: [{ body: String, date: Date }],
  hidden: Boolean
})

export default mongoose.model('Post', postSchema)
