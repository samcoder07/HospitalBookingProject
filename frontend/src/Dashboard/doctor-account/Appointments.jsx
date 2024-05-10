import React, { useEffect } from 'react'

const Appointments = ({ appointments }) => {
	return (
		<table className='w-full text-left text-sm text-gray-500'>
			<thead className='text-xs text-gray-700 uppercase bg-gray-50'>
				<tr>
					<th className='px-6 py-3' scope='col'>name</th>
					<th className='px-6 py-3' scope='col'>gender</th>
					<th className='px-6 py-3' scope='col'>payment</th>
					<th className='px-6 py-3' scope='col'>price</th>
					<th className='px-6 py-3' scope='col'>booked on</th>
				</tr>
			</thead>

			<tbody>
				{appointments?.map(item => <tr key={item._id}>
					<th scope='row' className='flex items-center px-6 py-4 text-gray-900 whitespace-nowrap'>
						<img src={item.user?.photo} className='w-10 h-10 rounded-full' alt="" />
					</th>
					<td className='px-6 py-4'>{item.user?.gender}</td>
				</tr>)}
			</tbody>
		</table>
	)
}

export default Appointments
