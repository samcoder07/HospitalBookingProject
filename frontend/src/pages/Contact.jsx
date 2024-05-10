import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

const Contact = () => {
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// Send form data to backend
			await axios.post('http://localhost:5000/mail', JSON.stringify({ email, message }), {
				headers: {
					"Content-Type": "application/json"
				}
			});
			setSubmitted(true);
		} catch (error) {
			console.error('Error submitting form:', error);
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
						<button type="submit" onSubmit={handleSubmit} className='btn mx-80 rounded sm:w-fit'>Submit</button>
					</form>
				)}
			</div>
		</section >
	);
};

export default Contact;
