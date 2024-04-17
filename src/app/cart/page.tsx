'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { useCartStore } from '@/utils/store';

const CartPage = () => {
	const { products, removeFromCart, totalPrice, totalItems } = useCartStore();

	/* add this to all pages where we use "useCartStore" */
	useEffect(() => {
		useCartStore.persist.rehydrate();
	}, []);

	return (
		<div className='h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500 lg:flex-row'>
			{/* PRODUCTS */}
			<div className='h-1/2 p-4 flex flex-col justify-center overflow-scroll lg:w-2/3 lg:h-full 2xl:w-1/2 lg:px-10 xl:px-20'>
				{/* SINGLE ITEM */}
				{products &&
					products.map((item) => (
						<div
							key={item.optionTitle as string}
							className='flex items-center justify-between mb-4'>
							{item.img && (
								<div className='relative'>
									<Image
										src={item.img}
										alt='alt'
										width={100}
										height={100}
									/>
								</div>
							)}
							<div>
								<h1 className='uppercase font-bold text-xl'>
									{item.title} X{item.quantity}
								</h1>
								<span>{item.optionTitle}</span>
							</div>
							<h2 className='font-bold text-lg'>${item.price}</h2>
							<span
								className='cursor-pointer'
								onClick={() => removeFromCart(item)}>
								X
							</span>
						</div>
					))}
			</div>

			{/* PAYMENT TEXT */}
			<div
				className='h-1/2 flex flex-col gap-4 justify-center p-4 bg-fuchsia-50 lg:w-1/3 lg:h-full 2xl:w-1/2 
			lg:px-10 xl:px-20 2xl:text-xl 2xl:gap-6'>
				<div className='flex flex-row justify-between'>
					<span className=''>Subtotal ({totalItems} items)</span>
					<span className=''>${+totalPrice.toFixed(2)}</span>
				</div>
				<div className='flex justify-between'>
					<span className=''>Service Cost</span>
					<span className=''>$0.00</span>
				</div>
				<div className='flex justify-between'>
					<span className=''>Delivery Cost</span>
					<span className='text-green-500'>FREE!</span>
				</div>
				<hr className='my-2' />
				<div className='flex justify-between'>
					<span className=''>Total (INCL. VAT)</span>
					<span className='font-bold'>
						${+totalPrice.toFixed(2) + 0}
					</span>
				</div>
				<button className='bg-red-500 text-white p-3 rounded-md uppercase w-1/2 self-end'>
					Checkout
				</button>
			</div>
		</div>
	);
};

export default CartPage;
