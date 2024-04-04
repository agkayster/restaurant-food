'use client';
import React from 'react';
import Image from 'next/image';
import { featuredProducts } from '@/data';

export default function FeaturedItems() {
	return (
		<div className='w-screen overflow-x-scroll text-red-500'>
			{/* WRAPPER */}
			<div className='w-max flex'>
				{/* SINGLE ITEMS */}
				{featuredProducts.map(
					({ id, title, desc, img, price, options }) => (
						<div
							key={id}
							className='w-screen h-[60vh] flex flex-col items-center justify-around p-4 hover:bg-fuchsia-50
              transition-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h-[90vh]'>
							{/* IMAGE */}
							{img && (
								<div className='relative flex-1 w-full hover:rotate-[60deg] transition-all duration-500'>
									<Image
										src={img}
										alt='alt'
										fill
										className='object-contain'
									/>
								</div>
							)}
							{/* TEXT */}
							<div className='flex-1 flex flex-col gap-4 items-center justify-center text-center'>
								<h1 className='text-xl font-bold uppercase xl:text-2xl'>
									{title}
								</h1>
								{desc && <p className='p-1'>{desc}</p>}
								<span className='text-lg font-bold'>
									${price}
								</span>
								{/* BUTTON */}
								<button className='bg-red-500 text-white p-2 rounded-md'>
									Add to Cart
								</button>
							</div>
						</div>
					)
				)}
			</div>
		</div>
	);
}