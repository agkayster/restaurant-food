'use client';
import React from 'react';
import Image from 'next/image';

const DeleteBtn = () => {
	return (
		<button className='bg-red-400 p-2 rounded-full absolute top-4 right-4 text-white'>
			<Image src='/delete.png' alt='alt' width={20} height={20} />
		</button>
	);
};

export default DeleteBtn;
