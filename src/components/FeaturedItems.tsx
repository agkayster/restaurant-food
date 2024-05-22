import React from 'react';
import Image from 'next/image';
// import prisma from '@/utils/connect';
import Link from 'next/link';

import { ProductType } from '@/types/types';

const getData = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
		cache: 'no-store',
	});

	if (!res.ok) {
		throw new Error('Failed!');
	}

	return res.json();
};

export default async function FeaturedItems() {
	// const featuredProducts: ProductType[] = await prisma.product.findMany({
	// 	where: {
	// 		isFeatured: true,
	// 	},
	// });
	const featuredProducts: ProductType[] = await getData();

	return (
		<div className='w-screen overflow-x-scroll text-red-500'>
			{/* WRAPPER */}
			<div className='w-max flex'>
				{/* SINGLE ITEMS */}
				{featuredProducts.map(
					({ id, title, desc, img, price, options }) => (
						<Link
							href={`/product/${id}`}
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
									${price.toString()}
								</span>
								{/* BUTTON */}
								<button className='bg-red-500 text-white p-2 rounded-md'>
									Add to Cart
								</button>
							</div>
						</Link>
					)
				)}
			</div>
		</div>
	);
}
