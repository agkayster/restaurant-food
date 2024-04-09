'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CartIcon from './CartIcon';
import { signOut, useSession } from 'next-auth/react';

const links = [
	{
		id: 1,
		title: 'Homepage',
		url: '/',
	},
	{
		id: 2,
		title: 'Menu',
		url: '/menu',
	},
	{
		id: 3,
		title: 'Working Hours',
		url: '/',
	},
	{
		id: 4,
		title: 'Contact',
		url: '/contact',
	},
];

const Menu = () => {
	const [open, setOpen] = useState(false);

	const { status, data } = useSession();

	/* Temporary */
	// const user = false;

	const handleMobileBurgerResponse = () => {
		setOpen(!open);
	};

	return (
		<div>
			{open ? (
				<Image
					src='/close.png'
					alt='burger button'
					width={20}
					height={20}
					onClick={handleMobileBurgerResponse}
				/>
			) : (
				<Image
					src='/open.png'
					alt='burger button'
					width={20}
					height={20}
					onClick={handleMobileBurgerResponse}
				/>
			)}
			{open && (
				<div
					className='bg-red-500 text-white absolute left-0 top-24 flex flex-col gap-8 items-center 
			justify-center w-full h-[calc(100vh-6rem)] text-3xl z-10'>
					{links.map(({ id, title, url }) => (
						<Link
							href={url}
							key={id}
							onClick={() => setOpen(false)}>
							{title}
						</Link>
					))}
					{status === 'unauthenticated' ? (
						<Link href='/login' onClick={() => setOpen(false)}>
							Login
						</Link>
					) : (
						<div className='flex flex-col gap-6'>
							<Link href='/orders' onClick={() => setOpen(false)}>
								Orders
							</Link>

							<span className='cursor-pointer' onClick={() => signOut()}>Logout</span>
						</div>
					)}
					<Link href='/cart' onClick={() => setOpen(false)}>
						<CartIcon />
					</Link>
				</div>
			)}
		</div>
	);
};

export default Menu;
