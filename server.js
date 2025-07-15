import express from 'express'
// import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import usersRouter from './routes/users.js'
import postsRouter from './routes/posts.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3003

const uri = process.env.MONGODB_URI
// const client = new MongoClient(uri)

// ========== Middleware =========  
app.use(express.json())
app.use('/api/users', usersRouter)
app.use('/api/posts', postsRouter)

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

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
