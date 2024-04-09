import { ProductType } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const getData = async (category: string) => {
	const res = await fetch(
		`http://localhost:3000/api/products?cat=${category}`,
		{
			cache: 'no-store',
		}
	);

	if (!res.ok) {
		throw new Error('Failed!');
	}

	return res.json();
};

type Props = {
	params: { category: string };
};

const CategoryPage = async ({ params }: Props) => {
	const productsData: ProductType[] = await getData(params.category);

	return (
		<div className='flex flex-wrap text-red-500'>
			{productsData.map(({ id, title, desc, img, price, options }) => (
				<Link
					href={`/product/${id}`}
					key={id}
					/* sm:w-1/2 means after small screen */
					className='w-full h-[60vh] border-r-2 border-b-2 flex flex-col justify-between group even:bg-fuchsia-50 border-red-500 sm:w-1/2 md:w-1/3 p-4'>
					{/* IMAGE */}
					{img && (
						<div className='h-[80%] relative'>
							<Image
								src={img}
								alt='alt'
								fill
								className='object-contain'
							/>
						</div>
					)}
					{/* TEXT */}
					<div className='h-[20%] flex items-center justify-between font-bold'>
						<h1 className='text-xl uppercase p-1'>{title}</h1>
						<h2 className='group-hover:hidden text-xl'>${price}</h2>
						<button className='hidden uppercase group-hover:block bg-red-500 text-white p-2 rounded-md'>
							Add to Cart
						</button>
					</div>
				</Link>
			))}
		</div>
	);
};

export default CategoryPage;
