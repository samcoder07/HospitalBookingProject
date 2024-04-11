import React from 'react'
import { formateData } from '../../utils/formateDate'
const DoctorAbout = () => {
	return (
		<div>
			<div>
				<h3 className='text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2'>
					About
					<span className='text-irisBlueColor font-bold text-[24px] leading-9'>
						Samarth Saluja
					</span>
				</h3>
				<p className="text__para">
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus eius eaque amet ad facilis, voluptatibus deleniti impedit sapiente dicta quaerat minus, placeat necessitatibus tenetur saepe corporis quod quae voluptate excepturi. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident ipsum velit libero ex rem ducimus placeat quia quam, molestiae aut obcaecati eveniet molestias quas aspernatur iusto impedit consequuntur distinctio. Dolor!
				</p>
			</div>

			<div className="mt-12">
				<h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>Education</h3>

				<ul className='pt-4 md:p-5'>
					<li className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'>
						<div>
							<span className='text-irisBlueColor text-[15px] leading-6 font-semibold'>{formateData('08-08-2015')} - {formateData('08-08-2017')}</span>
							<p className='text-[16px] leading-6 font-medium text-textColor'>PHD in Surgeon</p>
						</div>
						<p className='text-[16px] leading-6 font-medium text-textColor'>New Apollo Hospital, New Delhi</p>
					</li>
					<li className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'>
						<div>
							<span className='text-irisBlueColor text-[15px] leading-6 font-semibold'>{formateData('04-08-2015')} - {formateData('04-08-2018')}</span>
							<p className='text-[16px] leading-6 font-medium text-textColor'>PHD in Surgeon</p>
						</div>
						<p className='text-[16px] leading-6 font-medium text-textColor'>New Apollo Hospital, New Delhi</p>
					</li>
				</ul>
			</div>

			<div className="mt-12">
				<h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>Experience</h3>
				<ul className='grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5'>
					<li className='p-4 rounded bg-[#fff9ea]'>
						<span className='text-yellowColor text-[15px] leading-6 font-semibold'>
							{formateData('08-08-2017')} - {formateData('08-08-2022')}
						</span>
						<p className='text-[16px] leading-6 font-medium  text-textColor'>
							Sr.Surgeon
						</p>
						<p className="text-[16px] leading-6 font-medium text-textColor">
							New Apollo Hospital,New Delhi
						</p>
					</li>
					<li className='p-4 rounded bg-[#fff9ea]'>
						<span className='text-yellowColor text-[15px] leading-6 font-semibold'>
							{formateData('08-08-2017')} - {formateData('08-08-2022')}
						</span>
						<p className='text-[16px] leading-6 font-medium  text-textColor'>
							Sr.Surgeon
						</p>
						<p className="text-[16px] leading-6 font-medium text-textColor">
							New Apollo Hospital,New Delhi
						</p>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default DoctorAbout
