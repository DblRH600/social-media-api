import express from 'express'
import Product from '../models/Product.js'

const router = express.Router()

/**
 * POST route to create new products
 */
router.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body)
    await newProduct.save()
    res.status(201).json(newProduct)
  } catch (error) {
    console.error(error)
    res.status(400).json({ message: error.message })
  }
})

/**
 * GET route to fetch all products
 */
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({})
    res.status(200).json(products)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error fetching products' })
  }
})

/**
 * Route to delete product by ID
 */
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id)
    res.json(deletedProduct)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
})

export default router
