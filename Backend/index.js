import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors'

import bookRoute from './routes/book.route.js'
import userRoute from './routes/user.route.js'

const app = express()

app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.MONGODBURI;

// Mongodb connection
try {
    mongoose.connect(URI)
    console.log("Connected Successfully");
} catch (error) {
    console.log("Error", error);
}

app.use('/book', bookRoute);
app.use('/user', userRoute);

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`)
})