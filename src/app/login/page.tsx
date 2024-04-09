'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
	const { data, status } = useSession();

	console.log('get status =>', status);

	const router = useRouter();

	if (status === 'loading') {
		return <p>Loading...</p>;
	}

	if (status === 'authenticated') {
		router.push('/');
	}

	return (
		<div className='p-4 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center'>
			{/* BOX */}
			<div
				className='h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-[70%] md:w-full md:items-center 
			lg:w-[60%] 2xl:w-[50%]'>
				{/* IMAGE CONTAINER */}
				<div className='relative h-1/3 w-full md:h-full md:w-1/2'>
					<Image
						src='/loginBg.png'
						alt='alt'
						fill
						className='object-cover rounded-l-md'
					/>
				</div>
				{/* FORM CONTAINER */}
				<div className='flex flex-col gap-8 p-10 md:gap-4 md:w-1/2'>
					{/* TITLE */}
					<h1 className='text-xl font-bold'>Welcome</h1>
					<p>
						Login to your account or create a new one using social
						buttons
					</p>
					<button
						type='button'
						className='google flex gap-4 p-4 ring-1 w-[95%] ring-orange-100 rounded-md md:p-2 lg:text-sm'
						onClick={() => signIn('google')}>
						<Image
							src='/google.png'
							alt='google image'
							width={20}
							height={20}
							className='object-contain'
						/>
						<span>Sign in with Google</span>
					</button>
					<button
						type='button'
						className='facebook flex gap-4 p-4 ring-1 w-[95%] ring-blue-100 rounded-md md:p-2 lg:text-sm'>
						<Image
							src='/facebook.png'
							alt='facebook image'
							width={20}
							height={20}
							className='object-contain'
						/>
						<span>Sign in with Facebook</span>
					</button>
					<div>
						<p className='text-sm'>
							Have a problem?{' '}
							<Link href='/contact' className='underline'>
								Contact us
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
