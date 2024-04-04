'use client';
import React from 'react';
import Image from 'next/image';

const SliderComponent = () => {
	const data = [
		{
			id: 1,
			title: 'always fresh & always crispy & always hot',
			image: '/slide1.png',
		},
		{
			id: 2,
			title: 'we deliver your order wherever you are in NY',
			image: '/slide2.png',
		},
		{
			id: 3,
			title: 'the best pizza to share with your family',
			image: '/slide3.jpg',
		},
	];

	return (
		<div className='flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)]'>
			{/* TEXT */}
			<div className='h-1/2 flex items-center justify-center flex-col gap-8 font-bold text-red-500'>
				<h1 className='text-5xl text-center uppercase p-4 md:text-6xl lg:text-7xl'>
					Test
				</h1>
				<button className='bg-red-500 text-white py-4 px-8'>
					Order now
				</button>
			</div>
			{/* IMAGE */}
			<div className='h-1/2 w-full relative'>
				<Image
					src='/slide1.png'
					alt='alt'
					fill
					className='object-cover'
				/>
			</div>
		</div>
	);
};

export default SliderComponent;
