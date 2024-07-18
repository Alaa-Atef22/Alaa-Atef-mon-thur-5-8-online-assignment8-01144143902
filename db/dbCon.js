
import mongoose from "mongoose";


const uri = 'mongodb://127.0.0.1:27017/book-app';
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connected successfully...."))
  .catch((err) => console.log(err));



























// import { MongoClient } from 'mongodb'


// const client = new MongoClient('mongodb://localhost:27017')

// client
//   .connect()
//   .then(() => console.log('db connected'))
//   .catch((err) => console.log(err))

// const db = client.db('Car-Rental-System')

// export default db


