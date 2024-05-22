import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Link from 'next/link';
// import CountDown from './CountDown';

const CountDown = dynamic(() => import('./CountDown'), {
	ssr: false,
});

function OfferComponent() {
	return (
		<div className='flex flex-col md:flex-row bg-black h-screen md:justify-between md:bg-[url("/offerBg.png")] md:h-[70vh]'>
			{/* TEXT */}
			<div className='flex-1 flex flex-col items-center justify-center gap-4 text-center p-6'>
				<h1 className='text-white text-5xl font-bold'>
					Delicious Burger & French Fry
				</h1>
				<p className='text-white lg:text-xl'>
					Our hot sizzling, delicious burgers and french fries are running out fast. Grab your share.
				</p>
				<CountDown />
				<Link href='/menu'>
					<button className='bg-red-500 text-white rounded-md py-3 px-6'>
						Order Now
					</button>
				</Link>
			</div>
			{/* IMAGE */}
			<div className='relative flex-1 w-full md:h-full'>
				<Image
					src='/offerProduct.png'
					alt='alt'
					fill
					className='object-contain'
				/>
			</div>
		</div>
	);
}

export default OfferComponent;
