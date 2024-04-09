'use client';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import Link from 'next/link';

const UserLinks = () => {
	const { status, data } = useSession();

	return (
		<div>
			{status === 'unauthenticated' ? (
				<Link href='/login'>Login</Link>
			) : (
				<div className='flex flex-row'>
					<Link href='/orders'>Orders</Link>
					<span className='cursor-pointer ml-4' onClick={() => signOut()}>
						Logout
					</span>
				</div>
			)}
		</div>
	);
};

export default UserLinks;
