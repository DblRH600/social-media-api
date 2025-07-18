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
  // get query values
  const { category, price, sortBy, minPrice, maxPrice } = req.query

  // create a query object for db
  const query = {}
  const sort = {}

  // check if the query has been sent
  if (category) {
    // if provided, add to query object
    query.category = { $eq: category }
  }

  if (price) {
    query.price = { $lte: price }
  }

  if (minPrice) {
    query.price = { $gte: minPrice }
  }

  if (maxPrice) {
    query.price = { $lte: maxPrice }
  }

  if (sortBy) {
    const [price, value] = sortBy.split('_')
    // console.log('VALUES: ', values)
    sort.price = value === 'asc' ? 1 : -1
  }

  console.log('QUERY OBJ: ', query)
  console.log('SORT OBJ: ', sort)

  if (!page) {
    page = 1
  }

  if (!limit) {
    limit = 10
  }
  //  category: 0,
  try {
    const products = await Product.find(query)
      .select({ __v: 0, _id: 0 })
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
    // 1st is the query, 2nd is the projection, 3rd is the sorting
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

// Add sample products to database
router.get('/db/seed', async (req, res) => {
  try {
    await Product.deleteMany({})

    const sampleProducts = [
      { name: 'Wireless Mouse', price: 25.99, category: 'Electronics' },
      { name: 'Bluetooth Speaker', price: 49.99, category: 'Electronics' },
      { name: 'Yoga Mat', price: 19.99, category: 'Fitness' },
      { name: 'Running Shoes', price: 89.99, category: 'Footwear' },
      { name: 'Coffee Maker', price: 39.99, category: 'Kitchen' },
      { name: 'Notebook Pack', price: 12.99, category: 'Stationery' },
      { name: 'Desk Lamp', price: 22.99, category: 'Home' },
      { name: 'Water Bottle', price: 9.99, category: 'Fitness' },
      { name: 'Backpack', price: 34.99, category: 'Accessories' },
      { name: 'Smartwatch', price: 129.99, category: 'Electronics' }
    ]

    const createdProducts = await Product.insertMany(sampleProducts)
    res
      .status(201)
      .json({ message: 'Seed successful', products: createdProducts })
  } catch (error) {
    res.status(500).json({ message: 'Seed failed', error: error.message })
  }
})

export default router
