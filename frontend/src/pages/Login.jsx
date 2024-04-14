import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const Login = () => {
	const [formData, setformData] = useState({
		email: '',
		password: ''
	})

	const handleInputChange = e => {
		setformData({ ...formData, [e.target.name]: e.target.value })
	}
	return (
		<section className='px-5 lg:px-0'>
			<div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
				<h3 className='text-headingColor tex-[22px] leading-9 font-bold mb-10'>
					Hello! <span className='text-primaryColor'>Welcome</span>Back
				</h3>

				<form className="py-4 md:px-0">
					<div className="mb-5">
						<input type="email" name="email" id="email" placeholder='Enter your Email...' value={formData.email} onChange={handleInputChange} className='w-full py-3  border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-hradingColor placeholder:text-textColor cursor-pointer' required />
					</div>
					<div className="mb-5">
						<input type="password" name="password" id="password" placeholder='Enter Password...' value={formData.password} onChange={handleInputChange} className='w-full py-3  border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-hradingColor placeholder:text-textColor cursor-pointer' required />
					</div>

					<div className="mt-7">
						<button type="submit" className='w-full bg-primaryColor text-white text-[18px] leading-[30px]rounded-lg px-4 py-3 '>
							Login
						</button>
					</div>

					<p className='mt-5 text-textColor text-center'>
						Don&apos;t have an account?
						<Link to="/signup" className="text-primaryColor font-medium ml-1">
							SignUp
						</Link>
					</p>
				</form>
			</div>
		</section>
	)
}

export default Login
