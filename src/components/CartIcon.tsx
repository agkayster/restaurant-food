'use client';
import { useCartStore } from '@/utils/store';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';

const CartIcon = () => {
	const { totalItems } = useCartStore();

	const { data: session } = useSession();

	/* add this to all pages where we use "useCartStore" */
	useEffect(() => {
		useCartStore.persist.rehydrate();
	}, []);

	return (
		<div className='flex gap-4 items-center'>
			<div className='relative w-8 h-8 md:w-5 md:h-5'>
				<Image src='/cart.png' alt='cart icon' fill sizes='100vw' />
			</div>
			{!session?.user.email ? (
				<span>Cart (0)</span>
			) : (
				<span>Cart ({totalItems})</span>
			)}
		</div>
	);
};

export default CartIcon;
