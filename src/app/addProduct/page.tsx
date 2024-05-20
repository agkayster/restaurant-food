'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
// import prisma from '@/utils/connect';

type OptionType = {
	title: string;
	additionalPrice: number;
};

const AddNewProduct = () => {
	const { data: session, status } = useSession();

	const [isFeatured, setIsFeatured] = useState<string>('no');

	/* form inputs */
	const [inputs, setInputs] = useState<any>({
		title: '',
		desc: '',
		price: 0,
		catSlug: '',
	});

	const [option, setOption] = useState<OptionType>({
		title: '',
		additionalPrice: 0,
	});

	const [options, setOptions] = useState<OptionType[]>([]);

	/* uploading our image file */
	const [file, setFile] = useState<File>();

	const router = useRouter();

	status === 'loading' && <h1>Loading...</h1>;

	status === ('unauthenticated' || !session?.user.isAdmin) &&
		router.push('/');

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { value } = e.target;
		const { name } = e.target;

		setInputs((prev: any) => {
			/* instead of using spread "inputs", use spread "prev" */
			return { ...prev, [name]: value };
		});
	};

	const handleOptionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		const { name } = e.target;
		setOption((prev: any) => {
			/* instead of using spread "option", use spread "prev" */
			return { ...prev, [name]: value };
		});
	};

	/* upload image API function to cloudinary */
	const upload = async () => {
		const data = new FormData();

		/* get our file which contains imgage item from state and appends it to data */
		data.append('file', file!);

		/* upload preset is your cloudinary folder name */
		data.append('upload_preset', 'restaurant-app');

		const res = await fetch(
			'https://api.cloudinary.com/v1_1/ejikedinary/image/upload',
			{
				method: 'POST',
				body: data,
			}
		);

		const resData = await res.json();
		/* returns the url link for our image */
		return resData.url;
	};

	const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement;

		/* take the first file which is our image from the list of files and passes it to item */
		const item = (target.files as FileList)[0];

		/* sends item to file state */
		setFile(item);
	};

	const handleAddOption = () => {
		/* instead of using spread "options", use spread "prev" */
		setOptions((prev) => [...prev, option]);
	};

	const handleIsFeaturedChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		setIsFeatured(e.target.value as any);
	};

	/* only user that is admin can create product */
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			/* pass our "upload" function that has our image url */
			const url = await upload();

			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/products`,
				{
					method: 'POST',
					/* converting all the data in our body to string */
					body: JSON.stringify({
						/* set our "img" field which is a string in our database to "url" */
						img: url,
						...inputs,
						isFeatured: isFeatured === 'yes' ? true : false,
						options,
					}),
				}
			);

			const data = await res.json();
			router.push(`/product/${data.id}`);
		} catch (error) {
			console.log('get submit product err =>', error);
		}
	};

	console.log('get is feature =>', isFeatured);

	return (
		<div className='p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center text-red-500'>
			<form
				className='flex flex-wrap gap-6 h-full overflow-y-auto px-2 md:px-4'
				onSubmit={handleSubmit}>
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
					<input
						type='file'
						id='file'
						className='hidden'
						onChange={handleChangeImage}
					/>
				</div>
				<div className='w-full flex flex-col gap-2'>
					<label className='text-sm'>Title</label>
					<input
						className='ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none'
						type='text'
						placeholder='Bella Napoli'
						name='title'
						value={inputs.title || ''}
						onChange={handleInputChange}
					/>
				</div>
				<div className='w-full flex flex-col gap-2'>
					<label className='text-sm'>Description</label>
					<textarea
						rows={3}
						className='ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none'
						placeholder='A timeless favorite with a twist, showcasing a thin crust topped with sweet tomatoes, fresh basil and creamy mozzarella.'
						name='desc'
						value={inputs.desc || ''}
						onChange={handleInputChange}
					/>
				</div>
				<div className='w-full flex flex-col gap-2'>
					<label className='text-sm'>Price</label>
					<input
						className='ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none'
						type='number'
						placeholder='29'
						name='price'
						value={inputs.price || ''}
						onChange={handleInputChange}
					/>
				</div>
				<div className='w-full flex flex-col gap-2'>
					<label className='text-sm'>Category</label>
					<input
						className='ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none'
						type='text'
						placeholder='pizzas'
						name='catSlug'
						value={inputs.catSlug || ''}
						onChange={handleInputChange}
					/>
				</div>
				<div className='w-full flex flex-col gap-2'>
					<label htmlFor='isFeatured' className='text-sm'>
						Is this Featured?
					</label>
					<select
						id='isFeatured'
						onChange={handleIsFeaturedChange}
						className='ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none'>
						<option value='no'>No</option>
						<option value='yes'>Yes</option>
					</select>
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
								value={option.title || ''}
								onChange={handleOptionsChange}
							/>
							<input
								className='ring-1 ring-red-200 px-2 py-4 rounded-sm placeholder:text-red-200 outline-none'
								type='number'
								placeholder='Additional Price'
								name='additionalPrice'
								onChange={handleOptionsChange}
								value={option.additionalPrice || ''}
							/>
						</div>
						{/*use a "div" here instead of a "button", so the page does not keep refreshing since this is not the "form" button */}
						<div
							className='bg-gray-500 p-2 text-white rounded-md w-full'
							onClick={handleAddOption}>
							Add Option
						</div>
					</div>
					<div className='flex flex-wrap gap-10 mt-2'>
						{options &&
							options.map(({ title, additionalPrice }) => (
								<div
									key={title}
									className='p-2 rounded-md flex items-center justify-center gap-3 cursor-pointer bg-gray-200 text-gray-400'
									/* onclick button deletes an already displayed item from the optional items */
									onClick={() =>
										setOptions(
											options.filter(
												(opt) => opt.title !== title
											)
										)
									}>
									<span>{title}</span>
									<span className='text-xs'>
										${additionalPrice}
									</span>
								</div>
							))}
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
