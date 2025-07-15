import mongoose from 'mongoose'

const { Schema } = mongoose

// Defines the User Schema
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'], //field must be provided
    unique: true, // Must be unique collection
    trim: true, // removes whitespace
    minlength: [3, 'Username must be at least 3 chars long']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true, // Converts email to lowercase
    match: [/.+\@.+\..+/, 'Please enter a valid email address'] // Regex for email format
  },
  age: {
    type: Number,
    min: [18, 'Must be at least 18 years old'], // Minimum value
    max: 120 // Maximum value
  },
    role: {
    type: String,
    enum: {
      values: ['user', 'admin'], // The value must be one of these strings
      message: '{VALUE} is not a supported role'
    },
    default: 'user' // If not provided, defaults to 'user'
  },
  createdAt: {
    type: Date,
    default: () => Date.now(), // Sets the value to the current date/time
    immutable: true // Cannot be changed after creation
  },
  isVerified: {
    type: Boolean,
    default: false, // set the default to false so that verification can be processed
  },
})

// create user model for the user collection
export default mongoose.model('User', userSchema) 