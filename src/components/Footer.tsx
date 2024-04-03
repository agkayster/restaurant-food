import Link from 'next/link';
import React from 'react';

const Footer = () => {
	return (
		<div className='h-12 md:h-24 p-4 lg:p-10 xl:p-20 text-red-500 flex items-center justify-between'>
			<Link href='/' className='font-bold text-lg uppercase'>
				blueflame
			</Link>
			<p>©All rights reserved</p>
		</div>
	);
};

export default Footer;
