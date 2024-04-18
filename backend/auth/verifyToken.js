import jwt from 'jsonwebtoken'
import Doctor from '../models/DoctorSchema.js'
import User from '../models/UserSchema.js'

export const authentication = async (req, res, next) => {
	// get token if it nexist 
	const authToken = req.headers.authorization

	// check if token exist 
	if (!authToken || !authToken.startsWith('Bearer ')) {
		return res.status(401).json({ success: false, message: "No token, authentication denied" })
	}

	try {
		console.log(authToken);

		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

		req.userId = decoded.id
		req.role = decoded.role

		next()
	} catch (error) {
		if (error.name === 'TokenExpiredError') {
			return res.status(401).json({ message: 'Token is expired' })
		}

		return res.status(401).json({ success: false, message: "Invalid token" })
	}
}

export const restrict = roles => async (req, res, next) => {
	const userId = req.userId

	let user;

	const patient = await User.findById(userId)
	const doctor = await Doctor.findById(userId)

	if (patient) {
		user = patient
	}

	if (doctor) {
		user = doctor
	}

	if (!roles.includes(user.role)) {
		return res.status(401).json({ success: false, message: "you're not authorized" })
	}
	next()
}