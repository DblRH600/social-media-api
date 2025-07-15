import express from 'express'
import User from '../models/User.js'

const router = express.Router()


// create a new user test route
router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body)
    await newUser.save()
    res.status(201).json(newUser)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: e.message })
  }
})

// get all users test route
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// get user route by id
router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findById(id)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// find user by username --> /api/users/username/:username
router.get('/username/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne( { username: username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        res.json(user)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error'})
    }
})

export default router