import React from 'react'
import Home from '../../pages/Home'
import Contact from '../../pages/Contact'
import Doctors from '../../pages/Doctors/Doctors'
import DoctorDetails from '../../pages/Doctors/DoctorDetails'
import Login from '../../pages/Login'
import Services from '../../pages/Services'
import Signup from '../../pages/Signup'

import { Routes, Route } from 'react-router-dom'
const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />}></Route>
			<Route path='/home' element={<Home />}></Route>
			<Route path='/doctors' element={<Doctors />}></Route>
			<Route path='/doctors/:id' element={<DoctorDetails />}></Route>
			<Route path='/login' element={<Login />}></Route>
			<Route path='/services' element={<Services />}></Route>
			<Route path='/signup' element={<Signup />}></Route>
			<Route path='/contact' element={<Contact />}></Route>
		</Routes>
	)
}

export default Router
