'use client';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const UserLinks = () => {
	const { status, data } = useSession();

	const router = useRouter();

	return (
		<div>
			{status === 'unauthenticated' ? (
				<Link href='/login'>Login</Link>
			) : (
				<div className='flex flex-row'>
					<Link href='/orders'>Orders</Link>
					<span
						className='cursor-pointer ml-4'
						onClick={() => signOut()}>
						Logout
					</span>
					{/* <span
						className='cursor-pointer ml-4'
						onClick={() => {
							router.push('/');
							signOut();
						}}>
						Logout
					</span> */}
				</div>
			)}
		</div>
	);
};

export default UserLinks;
