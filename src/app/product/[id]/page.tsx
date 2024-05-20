import DeleteButton from '@/components/DeleteBtn';
import Price from '@/components/Price';
import { ProductType } from '@/types/types';
import Image from 'next/image';
import React from 'react';
import { singleProduct } from '../../../data';
import prisma from '@/utils/connect';

type Props = {
	params: { id: string };
};

// const getData = async (id: string) => {
// 	const res = await fetch(`http://localhost:3000/api/products/${id}`, {
// 		cache: 'no-store',
// 	});

// 	if (!res.ok) {
// 		throw new Error('Failed!');
// 	}

// 	return res.json();
// };

const SingleProduct = async ({ params }: Props) => {
	console.log('get params id =>', params);

	const singleProduct: any = await prisma.product.findUnique({
		where: {
			id: params?.id,
		},
	});
	// const singleProduct: ProductType = await getData(params?.id);
	// const {
	// 	id: singleProdId,
	// 	title,
	// 	desc,
	// 	price,
	// 	img,
	// 	options,
	// } = singleProduct;

	return (
		<div className='p-4 lg:px-20 xl:px-40 h-screen flex flex-col justify-around text-red-500 md:flex-row md:gap-8 md:items-center relative'>
			<DeleteButton id={singleProduct.id} />
			{/* IMAGE */}
			<div className='relative h-1/2 w-full z-10 md:h-[70%] md:w-1/2'>
				{singleProduct.img && (
					<Image
						src={singleProduct.img}
						alt=''
						fill
						className='object-contain'
					/>
				)}
			</div>
			{/* TEXT */}
			<div className='h-1/2 flex flex-col gap-4 md:w-1/2 md:h-[70%] md:justify-center md:gap-6 xl:gap-8'>
				<h1 className='text-2xl font-bold uppercase'>
					{singleProduct.title}
				</h1>
				<p>{singleProduct.desc}</p>
				{/* price gave an lint error for type, so in Price component we set the Props type */}
				<Price product={singleProduct} />
			</div>
		</div>
	);
};

export default SingleProduct;
