'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const AddNewProduct = () => {
	const { data: session, status } = useSession();

	const [input, setInput] = useState({
		title: '',
		desc: '',
		price: 0,
		catSlug: '',
	});

	const [options, setOptions] = useState({
		title: '',
		additionalPrice: 0,
	});

	const router = useRouter();

	status === 'loading' && <h1>Loading...</h1>;

	status === ('unauthenticated' || !session?.user.isAdmin) &&
		router.push('/');

	return (
		<div className='p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center text-red-500'>
			<form className='flex flex-wrap gap-6 h-full overflow-y-auto px-2'>
				<h1 className='text-4xl mb-2 text-gray-300 font-bold'>
					Add New Product
				</h1>
				<div className='w-full flex flex-col gap-2'>
					<label
						className='text-sm cursor-pointer flex gap-4 items-center'
						htmlFor='file'>
						<Image
							src='/upload.png'
							alt=''
							width={30}
							height={20}
						/>
						<span>Upload Image</span>
					</label>
					<input type='file' id='file' className='hidden' />
				</div>
				<div className='w-full flex flex-col gap-2'>
					<label className='text-sm'>Title</label>
					<input
						className='ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none'
						type='text'
						placeholder='Bella Napoli'
						name='title'
					/>
				</div>
				<div className='w-full flex flex-col gap-2'>
					<label className='text-sm'>Description</label>
					<textarea
						rows={3}
						className='ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none'
						placeholder='A timeless favorite with a twist, showcasing a thin crust topped with sweet tomatoes, fresh basil and creamy mozzarella.'
						name='desc'
					/>
				</div>
				<div className='w-full flex flex-col gap-2'>
					<label className='text-sm'>Price</label>
					<input
						className='ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none'
						type='number'
						placeholder='29'
						name='price'
					/>
				</div>
				<div className='w-full flex flex-col gap-2'>
					<label className='text-sm'>Category</label>
					<input
						className='ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none'
						type='text'
						placeholder='pizzas'
						name='catSlug'
					/>
				</div>
				<div className='w-full flex flex-col gap-2'>
					<label className='text-sm'>Options</label>
					<div className='flex flex-col gap-3 md:flex-row'>
						<div className='flex'>
							<input
								className='ring-1 ring-red-200 px-2 py-4 rounded-sm placeholder:text-red-200 outline-none'
								type='text'
								placeholder='Title'
								name='title'
							/>
							<input
								className='ring-1 ring-red-200 px-2 py-4 rounded-sm placeholder:text-red-200 outline-none'
								type='number'
								placeholder='Additional Price'
								name='additionalPrice'
							/>
						</div>
						<button className='bg-gray-500 p-2 text-white rounded-md w-full'>
							Add Option
						</button>
					</div>
					<div className='flex flex-wrap gap-4 mt-2'>
						<div className='p-2  rounded-md cursor-pointer bg-gray-200 text-gray-400'>
							<span>small</span>
							<span className='text-xs'>0</span>
						</div>
					</div>
				</div>
				<button
					type='submit'
					className='bg-red-500 p-4 text-white w-48 rounded-md relative h-14 flex items-center justify-center'>
					Submit
				</button>
			</form>
		</div>
	);
};

export default AddNewProduct;
