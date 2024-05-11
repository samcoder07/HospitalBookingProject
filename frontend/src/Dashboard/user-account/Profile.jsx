import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import uploadImageToCloudinary from '../../utils/uploadCloudinary.js'
import { BASE_URL, token } from '../../config.js'
import { toast } from 'react-toastify'
import HashLoader from 'react-spinners/HashLoader'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
const Profile = ({ user }) => {
	const [selectedFile, setSelectedFile] = useState(null)
	const [loading, setLoading] = useState(false)
	const [visibility, setVisibilityHide] = useState(true);
	const [formData, setformData] = useState({
		name: '',
		email: '',
		password: '',
		photo: null,
		gender: '',
		bloodType: '',
	})

	const navigate = useNavigate()

	useEffect(() => {
		setformData({ name: user.name, email: user.email, photo: user.photo, gender: user.gender, bloodType: user.bloodType })
	}, [user])

	const handleInputChange = e => {
		const { name, value } = e.target;
		if (name === 'password' && value.length > 6) {
			// If password length exceeds 6 characters, truncate it to 6 characters
			setformData({ ...formData, [name]: value.slice(0, 6) });
		} else {
			setformData({ ...formData, [name]: value });
		}
	}

	const toggleVisibility = () => {
		setVisibilityHide(!visibility);
	};

	const passwordInputType = visibility ? "password" : "text";
	const handleIFileInputChange = async (event) => {
		const file = event.target.files[0]

		const data = await uploadImageToCloudinary(file)
		setSelectedFile(data.url)
		setformData({ ...formData, photo: data.url })

	}

	const submitHandler = async event => {
		event.preventDefault();
		setLoading(true);

		try {
			const res = await fetch(`${BASE_URL}/users/${user._id}`, {
				method: "put",
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(formData)
			})

			console.log(res);
			const { message } = await res.json()

			if (!res.ok) {
				throw new Error(message)
			}

			setLoading(false)
			toast.success(message)
			navigate('/users/profile/me')
		} catch (error) {
			toast.error(error.message)
			setLoading(false)
		}
	}

	return (
		<div className='mt-10'>
			<form onSubmit={submitHandler} method="post">
				<div className="mb-5">
					<input type="text" name="name" id="name" placeholder='Enter Full Name...' value={formData.name} onChange={handleInputChange} className='w-full pr-4 py-3  border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-hradingColor placeholder:text-textColor cursor-pointer' />
				</div>
				<div className="mb-5">
					<input type="email" name="email" id="email" placeholder='Enter Your Email...' value={formData.email} onChange={handleInputChange} className='w-full pr-4 py-3  border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-hradingColor placeholder:text-textColor cursor-pointer' aria-readonly readOnly />
				</div>
				<div className="mb-5 flex">
					<input
						type={passwordInputType}
						name="password"
						id="password"
						placeholder='Enter Password...'
						value={formData.password}
						onChange={handleInputChange}
						className='w-full pr-4 py-3  border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-hradingColor placeholder:text-textColor cursor-pointer'
					/>
					<span className="mt-3 text-primaryColor" id="basic-addon2" onClick={toggleVisibility}>
						{visibility ? <VisibilityIcon /> : <VisibilityOffIcon />}
					</span>
				</div>
				<div className="mb-5">
					<input type="text" name="bloodType" id="bloodType" placeholder='Enter Blood Type...' value={formData.bloodType} onChange={handleInputChange} className='w-full pr-4 py-3  border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-hradingColor placeholder:text-textColor cursor-pointer' />
				</div>

				<div className="mb-5 flex items-center justify-between">
					<label className='text-headingColor font-bold text-[16px] leading-7'>
						Gender:
						<select name="gender" value={formData.gender} onChange={handleInputChange} className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none">
							<option value="" hidden>Select</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
							<option value="other">Other</option>
						</select>
					</label>
				</div>

				<div className="mb-5 flex items-center gap-3">
					{formData.photo && <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center'>
						<img src={formData.photo} className='w-full rounded-full' alt="" />
					</figure>}

					<div className='relative w-[130px] h-[50px]'>
						<input type="file" onChange={handleIFileInputChange} name='photo' id='customFile' accept='.jpg,.png' className='absolute top-0 left-0 w-full opacity-0 cursor-pointer' />

						<label htmlFor="customFile" className='absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer'>{selectedFile ? selectedFile.name : "Upload Photo"}</label>
					</div>
				</div>

				<div className="mt-7">
					<button disabled={loading && true} type="submit" className='w-full bg-primaryColor text-white text-[18px] leading-[30px]rounded-lg px-4 py-3 '>
						{loading ? (<HashLoader size={25} color="#ffffff" />) : ("Update")}
					</button>
				</div>
			</form>
		</div>
	)
}

export default Profile
