import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CartIcon = () => {
	return (
		<Link href='href' className='flex gap-4 items-center'>
			<div className='relative w-8 h-8'>
				<Image src='/cart.png' alt='cart icon' fill />
			</div>
			<span>Cart (3)</span>
		</Link>
	);
};

export default CartIcon;
