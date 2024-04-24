import User from '../models/UserSchema.js'
import Booking from '../models/BookingSchema.js'
import Doctor from '../models/DoctorSchema.js'
export const updateUser = async (req, res) => {
	const id = req.params.id

	try {

		const updateUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true })

		res.status(200).json({ success: true, message: "Successfully updated", data: updateUser })

	} catch (error) {
		res.status(500).json({ success: false, message: "Failed to update", data: updateUser })
	}
}

export const deleteUser = async (req, res) => {
	const id = req.params.id

	try {

		await User.findByIdAndDelete(id,)

		res.status(200).json({ success: true, message: "Successfully deleted" })

	} catch (error) {
		res.status(500).json({ success: false, message: "Failed to delete" })
	}
}

export const getSingleUser = async (req, res) => {
	const id = req.params.id

	try {

		const user = await User.findById(id).select("-password")

		res.status(200).json({ success: true, message: "User Found", data: user })

	} catch (error) {
		res.status(404).json({ success: false, message: "No user Found" })
	}
}

export const getAllUser = async (req, res) => {

	try {

		const users = await User.find({}).select("-password")

		res.status(200).json({ success: true, message: "User Found", data: users })

	} catch (error) {
		res.status(404).json({ success: false, message: "No user Found" })
	}
};

export const getUserProfile = async (req, res) => {
	const userId = req.userId

	try {
		const user = await User.findById(userId)

		if (!user) {
			res.status(404).json({ success: false, message: "No user Found" })
		}

		const { password, ...rest } = user._doc

		res.status(200).json({ success: true, message: "UserProfile is Matched", data: { ...rest } })

	} catch (error) {
		res.status(500).json({ success: false, message: "Something Went Wrong" })
	}
}

export const getMyAppointments = async (req, res) => {
	try {

		// step-1 : retireve appointment from booking specific error 
		const booking = await Booking.find({ user: req.userId })

		// step-2 : extract doctor ids from appointment bookings 
		const doctorIds = booking.map(el => el.doctor.id)

		// step-3 : retireve doctors using doctor ids 
		const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select('-password')

		res.status(200).json({ success: true, message: 'Appointment got booked', data: doctors })

	} catch (error) {
		res.status(500).json({ success: false, message: "Something Went Wrong" })
	}
}