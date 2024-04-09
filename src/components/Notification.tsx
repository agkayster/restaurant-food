import React from 'react';
import WelcomeMsg from './WelcomeMsg';

const Notification = () => {
	return (
		<div
			className='h-12 bg-red-500 text-white px-4 flex items-center justify-center text-sm 
    md:text-base cursor-pointer'>
			Free delivery for all orders over $50. Order your food now!
			{/* <div className='hidden md:flex'>
				<WelcomeMsg />
			</div> */}
		</div>
	);
};

export default Notification;
