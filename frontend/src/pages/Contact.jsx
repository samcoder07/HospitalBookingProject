import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import HashLoader from 'react-spinners/HashLoader.js'
const Contact = () => {
	const [email, setEmail] = useState('');
	const [submitted, setSubmitted] = useState(false);
	const [name, setName] = useState('');
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true); // Set loading state to true when form is submitted
			// Send form data to backend including name
			await axios.post('http://localhost:5000/mail', JSON.stringify({ email, name }), {
				headers: {
					"Content-Type": "application/json"
				}
			});
			setSubmitted(true);
		} catch (error) {
			console.error('Error submitting form:', error);
		} finally {
			setLoading(false); // Set loading state to false when submission is complete
		}
	};

	return (
		<section>
			<div className="px-4 mx-auto max-w-screen-md">
				<h2 className='heading text-center'>Contact Us</h2>
				<p className='mb-8 lg:mb-16 font-light text-center text__para'>
					Got a technical issue? Want to send feedback about a beta feature? Let us know.
				</p>
				{submitted ? (
					<p className="text-center bg-primaryColor text-white py-5 rounded-md cursor-pointer">Your message has been submitted!</p>
				) : (
					<form className='space-y-8' onSubmit={handleSubmit}>
						<div>
							<label htmlFor="email" className='form__label'>
								Full Name
							</label>
							<input
								type="text"
								id="name"
								placeholder='Enter Name...'
								className='form__input mt-1'
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</div>
						<div>
							<label htmlFor="email" className='form__label'>
								Your Email
							</label>
							<input
								type="email"
								id="email"
								placeholder='example@gmail.com'
								className='form__input mt-1'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						{/* <div className='sm:col-span-2'>
							<label htmlFor="message" className='form__label'>
								Your Message
							</label>
							<textarea
								rows="6"
								id="message"
								placeholder='Leave a comment...'
								className='form__input mt-1'
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								required
							></textarea>
						</div> */}
						<button type="submit" onSubmit={handleSubmit} className='btn mx-80 rounded sm:w-fit'>{loading ? <HashLoader size={25} color='#ffffff' /> : 'Submit'}</button>
					</form>
				)}
			</div>
		</section >
	);
};

export default Contact;
