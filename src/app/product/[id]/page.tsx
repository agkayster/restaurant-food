import Price from '@/components/Price';
import { singleProduct } from '@/data';
import Image from 'next/image';
import React from 'react';

const SingleProduct = () => {
	const { id, title, desc, price, img, options } = singleProduct;

	return (
		<div className='p-4 lg:px-10 xl:px-20 flex flex-col justify-around h-screen text-red-500 md:flex-row'>
			{/* IMAGE */}
			<div className='relative h-1/2 w-full'>
				{img && (
					<Image src={img} alt='' fill className='object-contain' />
				)}
			</div>
			{/* TEXT */}
			<div className='h-1/2 flex flex-col gap-4'>
				<h1 className='text-2xl font-bold uppercase'>{title}</h1>
				<p>{desc}</p>
				{/* price gave an lint error for type, so in Price component we set the Props type */}
				<Price price={price} options={options} id={id} />
			</div>
		</div>
	);
};

export default SingleProduct;
