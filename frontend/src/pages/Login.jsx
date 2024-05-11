import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../config'
import { toast } from 'react-toastify'
import { authContext } from '../context/AuthContext.jsx'
import HashLoader from 'react-spinners/HashLoader.js'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
const Login = () => {
	const [visibility, setVisibilityHide] = useState(true);
	const [formData, setformData] = useState({
		email: '',
		password: ''
	})

	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const { dispatch } = useContext(authContext)

	const handleInputChange = e => {
		const { name, value } = e.target;
		if (name === 'password' && value.length > 6) {
			// If password length exceeds 6 characters, truncate it to 6 characters
			setformData({ ...formData, [name]: value.slice(0, 6) });
		} else {
			setformData({ ...formData, [e.target.name]: e.target.value })
		}
	}
	const toggleVisibility = () => {
		setVisibilityHide(!visibility);
	};

	const passwordInputType = visibility ? "password" : "text";

	const submitHandler = async event => {
		event.preventDefault();
		setLoading(true);

		try {
			const res = await fetch(`${BASE_URL}/auth/login`, {
				method: "post",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			})


			const result = await res.json()

			if (!res.ok) {
				throw new Error(result.message)
			}

			dispatch({
				type: 'LOGIN_SUCCESS',
				payload: {
					user: result.data,
					token: result.token,
					role: result.role,
				}
			})

			console.log(result, "login data");

			setLoading(false)
			toast.success(result.message)
			navigate('/home')
		} catch (error) {
			toast.error(error.message)
			setLoading(false)
		}
	}

	return (
		<section className='px-5 lg:px-0'>
			<div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
				<h3 className='text-headingColor tex-[22px] leading-9 font-bold mb-10'>
					Hello! <span className='text-primaryColor'>Welcome</span>Back
				</h3>

				<form className="py-4 md:px-0" onSubmit={submitHandler}>
					<div className="mb-5">
						<input type="email" name="email" id="email" placeholder='Enter your Email...' value={formData.email} onChange={handleInputChange} className='w-full py-3  border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-hradingColor placeholder:text-textColor cursor-pointer' required />
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

					<div className="mt-7">
						<button type="submit" className='w-full bg-primaryColor text-white text-[18px] leading-[30px]rounded-lg px-4 py-3 '>
							{loading ? <HashLoader size={25} color='#ffffff' /> : 'Login'}
						</button>
					</div>

					<p className='mt-5 text-textColor text-center'>
						Don&apos;t have an account?
						<Link to="/signup" className="text-primaryColor font-medium ml-1">
							Register
						</Link>
					</p>
				</form>
			</div>
		</section>
	)
}

export default Login
