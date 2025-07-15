import express from 'express'
import Post from '../models/Post.js'

const router = express.Router()

/**
 * POST route to create a new post
 */
router.post('/', async (req, res) => {
  try {
    const post = await Post.create(req.body)
    res.status(201).json(post)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error creating post' })
  }
})

/**
 * POST get all posts
 */
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({})
    res.json(posts)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error fetching posts' })
  }
})

/**
 * POST get posts by user
 */
router.get('/user/:username', async (req, res) => {
  const { username } = req.params
  try {
    const userPosts = await Post.find({ author: username })
    res.json(userPosts)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
})

/**
 * POST search route wiht multiple conditions
 */
router.get('/search', async (req, res) => {
  const { author, hidden } = req.query
  try {
    const posts = await Post.find({ 
        $and: [{ author }, { hidden }] 
    })
    // const posts = await Post.find({
    //   $or: [{ author }, { hidden }]
    // })
    res.json(posts)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
})

/**
 * GET to find post by ID
 */
router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const post = await Post.findById(id)
        res.json(post)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message})
    }
})











export default router
