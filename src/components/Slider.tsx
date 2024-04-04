'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const SliderComponent = () => {
	/* initial start for our slides */
	const [currentSlide, setCurrentSlide] = useState(0);

	/* Data for different slides */
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
			image: '/slide3.jpeg',
		},
	];

	/* changes our images and slides every 2 secs */
	useEffect(() => {
		const interval = setInterval(
			() =>
				setCurrentSlide((prev) =>
					prev === data.length - 1 ? 0 : prev + 1
				),
			2000
		);

		return () => clearInterval(interval);
	}, [data.length]);

	return (
		<div className='flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row bg-fuchsia-50'>
			{/* TEXT */}
			<div className='flex-1 flex items-center justify-center flex-col gap-8 md:gap-6 font-bold text-red-500'>
				<h1 className='text-4xl text-center uppercase p-4 md:p-10 lg:text-5xl'>
					{data[currentSlide].title}
				</h1>
				<button className='bg-red-500 text-white py-4 px-8 md:mb-12'>
					Order now
				</button>
			</div>
			{/* IMAGE */}
			<div className='flex-1 relative'>
				<Image
					src={data[currentSlide].image}
					alt='alt'
					fill
					className='object-cover'
				/>
			</div>
		</div>
	);
};

export default SliderComponent;
