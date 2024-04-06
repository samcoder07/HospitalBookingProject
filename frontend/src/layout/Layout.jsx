import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Router from '../components/routes/Router'

const Layout = () => {
	return (
		<>
			<div className='text-center'>
				<Header />
				<main>
					<Router />
				</main>
				<Footer />
			</div>
		</>
	)
}

export default Layout
