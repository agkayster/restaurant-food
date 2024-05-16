import React from 'react';
// import { menu } from '@/data';
import Link from 'next/link';
import { MenuType } from '@/types/types';

export const dynamic = 'force-dynamic';

const getData = async () => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
		{
			cache: 'no-store',
		}
	);

	if (!res.ok) {
		throw new Error('Failed!');
	}

	return res.json();
};

const MenuPage = async () => {
	const menu: MenuType = await getData();

	return (
		<div className='p-4 lg:px-10 xl:px-20 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col md:flex-row items-center justify-center'>
			{menu &&
				menu.map(({ id, slug, title, desc, img, color }) => (
					<Link
						href={`/menu/${slug}`}
						key={id}
						className='w-full h-1/3 bg-cover p-4 md:h-1/2'
						style={{ backgroundImage: `url(${img})` }}>
						{/* TEXT */}
						<div className={`text-${color} w-1/2`}>
							<h1 className='uppercase font-bold text-xl'>
								{title}
							</h1>
							<p className='text-sm my-4'>{desc}</p>
							<button
								className={`hidden xl:block bg-${color} text-${
									color === 'black' ? 'white' : 'red-500'
								} py-2 px-4 rounded-md`}>
								Explore
							</button>
						</div>
					</Link>
				))}
		</div>
	);
};

export default MenuPage;
