import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import cors from 'cors';
import mongoose from 'mongoose';
import authRouter from './Routes/auth.js'
import userRouter from './Routes/user.js'
import doctorRouter from './Routes/doctor.js'
import reviewRouter from './Routes/Review.js'

dotenv.config();

const app = express();
const port = 5000;
const corsOption = {
	origin: true,
}

app.get('/', (req, res) => {
	res.send('Api is working');
})

// Database connection
mongoose.set('strictQuery', false)
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})

		console.log('MongoDB is connected');

	} catch (error) {
		console.error('MongoDB connection error:', error);
	}
}

// Middleware 
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOption))
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/doctors', doctorRouter)
app.use('/api/v1/reviews', reviewRouter)


app.listen(port, () => {
	connectDB();
	console.log("Server listening on port " + port);
})
