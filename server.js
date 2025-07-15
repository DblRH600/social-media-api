import express from 'express'
// import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import User from './models/User.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3003

const uri = process.env.MONGODB_URI
// const client = new MongoClient(uri)

// ========== Middleware =========
app.use(express.json())

// connect to MongoDB using mongoose
mongoose
  .connect(uri)
  .then(console.log('Connection to MongoDB established!'))
  .catch(e => console.log(`Error connecting to MongoDB: ${e}`))
let isConnected = false

// async function run() {
//   try {
//     // Connect the client to the server
//     await client.connect();
//     // Establish and verify connection
//     await client.db("social-media").command({ ping: 1 });
//     console.log("Connected successfully to MongoDB!");
//     isConnected = true;
//   } catch (error) {
//     console.error("Failed to connect to MongoDB:", error);
//     isConnected = false;
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

//run().catch(console.dir);

// ======== Routes =========
app.get('/', (req, res) => {
  if (isConnected) {
    return res.json({ message: 'Successfully connected to the DB!' })
  } else {
    return res.status(500).json({ message: 'Failed to connect to the DB.' })
  }
})

// create a new user test route
app.post('/users', async (req, res) => {
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
app.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
})


// get user route by id
app.get('/users/:id', async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: error.message})
    }})

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
