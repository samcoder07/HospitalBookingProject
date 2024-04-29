import { useState } from "react"
import { AiOutlineDelete } from 'react-icons/ai'
import uploadImageToCloudinary from "../../utils/uploadCloudinary"
import { BASE_URL, token } from "../../config"
import { toast } from 'react-toastify'
import { useEffect } from "react"
const Profile = ({ doctorData }) => {
	const [formData, setformData] = useState({
		name: '',
		email: '',
		password: '',
		phone: '',
		bio: '',
		gender: '',
		about: '',
		specialization: '',
		ticketPrice: 0,
		qualifications: [],
		experiences: [],
		timeSlots: [],
		photo: null
	})

	useEffect(() => {
		setformData({
			name: doctorData?.name,
			email: doctorData?.email,
			phone: doctorData?.phone,
			bio: doctorData?.bio,
			gender: doctorData?.gender,
			about: doctorData?.about,
			specialization: doctorData?.specialization,
			ticketPrice: doctorData?.ticketPrice,
			qualifications: doctorData?.qualifications,
			experiences: doctorData?.experiences,
			timeSlots: doctorData?.timeSlots,
			photo: doctorData?.photo
		})
	}, [doctorData])

	const handleInputChange = e => {
		setformData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleIFileInputChange = async event => {
		const file = event.target.files[0]

		const data = await uploadImageToCloudinary(file);

		console.log(data);
		setformData({ ...formData, photo: data?.url })
	}
	const updateProfileHandler = async e => {
		e.preventDefault()

		try {
			const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
				method: 'PUT',
				headers: {
					"content-type": "application/json",
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(formData)
			})

			const result = await res.json()
			if (!res.ok) {
				throw Error(result.message)
			}

			toast.success(result.message)

		} catch (error) {
			toast.error(error.message)
		}
	}

	const addItem = (key, item) => {
		setformData(prevFormData => ({ ...prevFormData, [key]: [...prevFormData[key], item] }))
	}

	const handleReusableInputChangeFunc = (key, index, event) => {
		const { name, value } = event.target

		setformData(prevFormData => {
			const updateItem = [...prevFormData[key]]

			updateItem[index][name] = value;

			return {
				...prevFormData,
				[key]: updateItem
			}
		})
	}

	const deleteItem = (key, index) => {
		setformData(prevFormData => ({
			...prevFormData,
			[key]: prevFormData[key].filter((_, i) => i !== index),
		}))
	}

	const addQualifications = e => {
		e.preventDefault()

		addItem('qualifications', {
			startingDate: '', endingDate: '', degree: 'PHD', university: 'AIIMS'
		})
	}


	const handleQualificationChange = (event, index) => {
		handleReusableInputChangeFunc("qualifications", index, event)
	}

	const deleteQualifications = (e, index) => {
		e.preventDefault()
		deleteItem('qualifications', index)
	}

	const addExperiences = e => {
		e.preventDefault()

		addItem('experiences', {
			startingDate: '', endingDate: '', position: 'Senior Surgeon', hospital: 'Fortis'
		})
	}


	const handleExperiencesChange = (event, index) => {
		handleReusableInputChangeFunc("experiences", index, event)
	}

	const deleteExperiences = (e, index) => {
		e.preventDefault()
		deleteItem('experiences', index)
	}

	const addTimeSlots = e => {
		e.preventDefault()

		addItem('timeSlots', {
			day: 'Monday', startTime: '11:45', endTime: '1:00'
		})
	}


	const handleTimeSlotsChange = (event, index) => {
		handleReusableInputChangeFunc("timeSlots", index, event)
	}

	const deleteTimeSlots = (e, index) => {
		e.preventDefault()
		deleteItem('timeSlots', index)
	}

	return (
		<div>
			<h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">Profile Information</h2>
			<form>
				<div className="mb-5">
					<p className="form__label">Name <span className="text-red-600">*</span></p>
					<input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Full Name" className="form__input" />
				</div>

				<div className="mb-5">
					<p className="form__label">Email <span className="text-red-600">*</span></p>
					<input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" className="form__input" readOnly aria-readonly disabled="true" />
				</div>

				<div className="mb-5">
					<p className="form__label">Phone <span className="text-red-600">*</span></p>
					<input type="number" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Enter Phone Number..." className="form__input" />
				</div>

				<div className="mb-5">
					<p className="form__label">Bio <span className="text-red-600">*</span></p>
					<input type="text" name="bio" value={formData.bio} onChange={handleInputChange} placeholder="Enter Bio..." className="form__input" />
				</div>

				<div className="mb-5">
					<div className="grid grid-cols-3 gap-5 mb-[30px]">
						<div>
							<p className="form__label">Gender <span className="text-red-600">*</span></p>
							<select name="gender" value={formData.gender} onChange={handleInputChange} className="form__input py-3.5 w-full">
								<option value="" hidden>Select</option>
								<option value="male">Male</option>
								<option value="female">Female</option>
								<option value="other">Other</option>
							</select>
						</div>
						<div>
							<p className="form__label">Specialization <span className="text-red-600">*</span></p>
							<select name="specialization" value={formData.specialization} onChange={handleInputChange} className="form__input py-3.5 w-full">
								<option value="" hidden>Select</option>
								<option value="surgeon">Surgeon</option>
								<option value="neurologist">Neurologist</option>
								<option value="dermotologist">Dermotologist</option>
							</select>
						</div>

						<div>
							<p className="form__label">Ticket Price <span className="text-red-600">*</span></p>
							<input type="number" placeholder="100" name="ticketPrice" value={formData.ticketPrice} className="form__input" onChange={handleInputChange} />
						</div>
					</div>
				</div>

				<div className="mb-5">
					<p className="form__label">Qualifications <span className="text-red-600">*</span></p>
					{
						formData.qualifications?.map((item, index) => (
							<div key={index}>
								<div>
									<div className="grid grid-cols-2 gap-5">
										<div>
											<p className="form__label">Starting Date <span className="text-red-600">*</span></p>
											<input type="date" name="startingDate" value={item.startingDate} className="form__input" onChange={e => handleQualificationChange(e, index)} />
										</div>
										<div>
											<p className="form__label">Ending Date <span className="text-red-600">*</span></p>
											<input type="date" name="endingDate" value={item.endingDate} className="form__input" onChange={e => handleQualificationChange(e, index)} />
										</div>
									</div>

									<div className="grid grid-cols-2 gap-5 mt-5">
										<div>
											<p className="form__label">Degree<span className="text-red-600">*</span></p>
											<input type="text" name="degree" value={item.degree} className="form__input" onChange={e => handleQualificationChange(e, index)} />
										</div>
										<div>
											<p className="form__label">University <span className="text-red-600">*</span></p>
											<input type="text" name="university" value={item.university} className="form__input" onChange={e => handleQualificationChange(e, index)} />
										</div>
									</div>


									<button onClick={e => deleteQualifications(e, index)} className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"><AiOutlineDelete /></button>
								</div>
							</div>
						))
					}

					<button onClick={addQualifications} className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer">Add Qualification</button>
				</div>

				<div className="mb-5">
					<p className="form__label">Experiences <span className="text-red-600">*</span></p>
					{
						formData.experiences?.map((item, index) => (
							<div key={index}>
								<div>
									<div className="grid grid-cols-2 gap-5">
										<div>
											<p className="form__label">Starting Date <span className="text-red-600">*</span></p>
											<input type="date" name="startingDate" value={item.startingDate} className="form__input" onChange={e => handleExperiencesChange(e, index)} />
										</div>
										<div>
											<p className="form__label">Ending Date <span className="text-red-600">*</span></p>
											<input type="date" name="endingDate" value={item.endingDate} className="form__input" onChange={e => handleExperiencesChange(e, index)} />
										</div>
									</div>

									<div className="grid grid-cols-2 gap-5 mt-5">
										<div>
											<p className="form__label">Position<span className="text-red-600">*</span></p>
											<input type="text" name="position" value={item.position} className="form__input" onChange={e => handleExperiencesChange(e, index)} />
										</div>
										<div>
											<p className="form__label">Hospitals <span className="text-red-600">*</span></p>
											<input type="text" name="hospital" value={item.hospital} className="form__input" onChange={e => handleExperiencesChange(e, index)} />
										</div>
									</div>


									<button onClick={e => deleteExperiences(e, index)} className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"><AiOutlineDelete /></button>
								</div>
							</div>
						))
					}

					<button onClick={addExperiences} className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer">Add Experience</button>
				</div>

				<div className="mb-5">
					<p className="form__label">Time Slots <span className="text-red-600">*</span></p>
					{
						formData.timeSlots?.map((item, index) => (
							<div key={index}>
								<div>
									<div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5">
										<div>
											<p className="form__label">Day<span className="text-red-600">*</span></p>
											<select name="day" value={item.day} onChange={e => handleTimeSlotsChange(e, index)} className="form__input py-3.5">
												<option value="" hidden>Select</option>
												<option value="monday">Monday</option>
												<option value="tuesday">Tuesday</option>
												<option value="wednesday">Wednesday</option>
												<option value="thursday">Thursday</option>
												<option value="friday">Friday</option>
												<option value="saturday">Saturday</option>
												<option value="sunday">Sunday</option>
											</select>
										</div>
										<div>
											<p className="form__label">Starting Time<span className="text-red-600">*</span></p>
											<input type="time" name="startTime" value={item.startTime} className="form__input" onChange={e => handleTimeSlotsChange(e, index)} />
										</div>
										<div>
											<p className="form__label">Ending Time<span className="text-red-600">*</span></p>
											<input type="time" onChange={e => handleTimeSlotsChange(e, index)} name="endTime" value={item.endTime} className="form__input" />
										</div>
										<div className="flex items-center">
											<button onClick={(e) => deleteTimeSlots(e, index)} className="bg-red-600 p-2 rounded-full text-white text-[18px]cursor-pointer mt-6"><AiOutlineDelete /></button>
										</div>
									</div>
								</div>
							</div>
						))
					}

					<button onClick={addTimeSlots} className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer">Add TimeSlots</button>
				</div>

				<div className="mb-5">
					<p className="form__label">About <span className="text-red-600">*</span></p>
					<textarea name="about" rows={5} value={formData.about} placeholder="Write about description..." onChange={handleInputChange} className="form__input"></textarea>
				</div>

				<div className="mb-5 flex items-center gap-3">
					{formData.photo && <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center'>
						<img src={formData.photo} className='w-full rounded-full' alt="" />
					</figure>}

					<div className='relative w-[130px] h-[50px]'>
						<input type="file" onChange={handleIFileInputChange} name='photo' id='customFile' accept='.jpg,.png' className='absolute top-0 left-0 w-full opacity-0 cursor-pointer' />

						<label htmlFor="customFile" className='absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer'>Upload Photo</label>
					</div>
				</div>

				<div className="mt-7">
					<button type="submit" onClick={updateProfileHandler} className="bg-primaryColor text-white tex-[18px] leading-[30px] w-full py-3 px-4 rounded-lg">Update Profile</button>
				</div>
			</form>
		</div>
	)
}

export default Profile
