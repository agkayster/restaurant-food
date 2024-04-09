import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Menu from './Menu';
import CartIcon from './CartIcon';
import UserLinks from './UserLinks';

const Navbar = () => {
	// Temporary
	// const user = false;

	return (
		<div className='h-12 text-red-500 p-4 flex flex-row items-center justify-between border-b-2 border-b-red-500 uppercase md:h-24 lg:px-10 xl:px-16'>
			{/* LEFT LINKS */}
			<div className='hidden md:flex gap-4 flex-1'>
				<Link href='/'>Home</Link>
				<Link href='/menu'>Menu</Link>
				<Link href='/contact'>Contact</Link>
			</div>
			{/* LOGO */}
			<div className='text-lg font-semibold flex-1 md:text-center'>
				<Link href='/'>blueflame</Link>
			</div>
			{/* MOBILE MENU */}
			<div className='md:hidden'>
				<Menu />
			</div>
			{/* RIGHT LINKS */}
			<div className='hidden md:flex gap-4 items-center justify-end flex-1 md:relative'>
				<div className='md:absolute md:top-[-4.5rem] md:right-2 lg:static flex items-center gap-2 cursor-pointer bg-orange-300 px-1 rounded-md'>
					<Image src='/phone.png' alt='' width={20} height={20} />
					<span>+234-8022229876</span>
				</div>
				<UserLinks />
				<CartIcon />
			</div>
		</div>
	);
};

export default Navbar;
