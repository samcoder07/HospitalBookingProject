
const Error = ({ errorMessage }) => {
	return (
		<div className="flex items-center justify-center w-full h-full">
			<h4 className="text-headingColor text-[20px] leading-[30px] font-semibold">{errorMessage}</h4>
		</div>
	)
}

export default Error
