'use client';
import React from 'react';

type Props = {
	price: number;
	id: number;
	options?: { title: string; additionalPrice: number }[];
};

export default function Price({ id, price, options }: Props) {
	return (
		<div className='flex flex-col gap-4'>
			<h2 className='text-2xl font-bold'>${price.toFixed(2)}</h2>
			{/* OPTIONS */}
			<div className='flex gap-4'>
				{options?.map(({ title, additionalPrice }) => (
					<button
						className='ring-1 ring-red-400 p-2 rounded-md w-full text-red-500'
						key={title}>
						{title}
					</button>
				))}
			</div>
			{/* QUANTITY AND ADD BUTTON */}
			<div className='flex justify-between items-center'>
				{/* QUANTITY */}
				<div className='flex justify-between w-full p-3 ring-1 ring-red-400'>
					<span>Quantity</span>
					<div className='flex gap-4 items-center'>
						{/* DECREASE */}
						<button>{'<'}</button>
						{/* NUMBER */}
						<span>1</span>
						{/* INCREASE */}
						<button>{'>'}</button>
					</div>
				</div>
				{/* CART BUTTON */}
				<button className='bg-red-500 w-40 p-3 text-white ring-1 ring-red-500'>
					Add to Cart
				</button>
			</div>
		</div>
	);
}
