import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import cors from 'cors';
import mongoose from 'mongoose';
import authRouter from './Routes/auth.js'
dotenv.config();

const app = express();
// const port = process.env.PORT || 3300;
const port = 5000;
const corsOption = {
	origin: true,
}

app.get('/', (req, res) => {
	res.send('Api is working');
})

//databse connection
mongoose.set('strictQuery', false)
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})

		console.log('MongoDB is connected');

	} catch (error) {
		console.log('MongoDB is not connected');
	}
}

// middleware 
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOption))
app.use('/api/v1/auth', authRouter)


app.listen(port, () => {
	connectDB();
	console.log("Server listening on port" + port);
})