import React, { useState, useEffect } from 'react';
import HashLoader from 'react-spinners/HashLoader';

const Loading = () => {
	const [showLoader, setShowLoader] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowLoader(false);
		}, 7000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div className='flex items-center justify-center w-full h-full'>
			{showLoader && <HashLoader color='#0067FF' />}
		</div>
	);
};

export default Loading;
