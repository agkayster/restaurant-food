'use client';
import { useSession } from 'next-auth/react';
import React from 'react';
import Link from 'next/link';

const UserLinks = () => {
	const { status, data } = useSession();

	return (
		<div>
			{status === 'unauthenticated' ? (
				<Link href='/login'>Login</Link>
			) : (
				<Link href='/orders'>Orders</Link>
			)}
		</div>
	);
};

export default UserLinks;
