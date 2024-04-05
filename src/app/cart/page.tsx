import React from 'react';
import Image from 'next/image';

const CartPage = () => {
	return (
		<div className='h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500 lg:flex-row'>
			{/* PRODUCTS */}
			<div className='h-1/2 p-4 flex flex-col justify-center overflow-scroll lg:w-2/3 lg:h-full 2xl:w-1/2 lg:px-10 xl:px-20'>
				{/* SINGLE ITEM */}
				<div className='flex items-center justify-between mb-4'>
					<div className='relative'>
						<Image
							src='/temporary/p1.png'
							alt='alt'
							width={100}
							height={100}
						/>
					</div>
					<div>
						<h1 className='uppercase font-bold text-xl'>
							Sicilian
						</h1>
						<span>Large</span>
					</div>
					<h2 className='font-bold text-lg'>$29.40</h2>
					<span className='cursor-pointer'>X</span>
				</div>
				<div className='flex items-center justify-between mb-4'>
					<div className='relative'>
						<Image
							src='/temporary/p1.png'
							alt='alt'
							width={100}
							height={100}
						/>
					</div>
					<div>
						<h1 className='uppercase font-bold text-xl'>
							Sicilian
						</h1>
						<span>Large</span>
					</div>
					<h2 className='font-bold text-lg'>$29.40</h2>
					<span className='cursor-pointer'>X</span>
				</div>
			</div>

			{/* PAYMENT TEXT */}
			<div
				className='h-1/2 flex flex-col gap-4 justify-center p-4 bg-fuchsia-50 lg:w-1/3 lg:h-full 2xl:w-1/2 
			lg:px-10 xl:px-20 2xl:text-xl 2xl:gap-6'>
				<div className='flex justify-between'>
					<span className=''>Subtotal (3 items)</span>
					<span className=''>$181.70</span>
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
					<span className='font-bold'>$31.00</span>
				</div>
				<button className='bg-red-500 text-white p-3 rounded-md uppercase w-1/2 self-end'>
					Checkout
				</button>
			</div>
		</div>
	);
};

export default CartPage;
