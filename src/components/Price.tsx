'use client';
import React, { useEffect, useState } from 'react';
import { ProductType } from '@/types/types';
import { useCartStore } from '@/utils/store';
import { toast } from 'react-toastify';

export default function Price({ product }: { product: ProductType }) {
	const { id, title, desc, img, price, options } = product;

	const [totalPrice, setTotalPrice] = useState(price);
	const [quantity, setQuantity] = useState(1);
	const [selectedItem, setSelectedItem] = useState(0);

	const { addToCart } = useCartStore();

	/* add this to all pages where we use "useCartStore" */
	// useEffect(() => {
	// 	useCartStore.persist.rehydrate();
	// }, []);

	useEffect(() => {
		setTotalPrice(
			quantity *
				(options?.length
					? +price + options[selectedItem].additionalPrice
					: +price)
		);
	}, [options, selectedItem, price, quantity]);

	const handleCart = () => {
		addToCart({
			id: product.id,
			title: product.title,
			img: product.img,
			price: totalPrice,
			...(product.options!.length && {
				optionTitle: product.options![selectedItem].title,
			}),
			quantity: quantity,
		});
		toast.success('Product has been added to the cart!');
	};

	return (
		<div className='flex flex-col gap-4 md:gap-8'>
			<h2 className='text-2xl font-bold'>${totalPrice}</h2>
			{/* OPTIONS */}
			<div className='flex gap-4'>
				{options?.length &&
					options?.map(({ title, additionalPrice }, index) => (
						<button
							className='ring-1 ring-red-400 p-2 rounded-md w-full text-red-500'
							style={{
								backgroundColor:
									selectedItem === index
										? 'rgb(248 113 113)'
										: 'white',
								color: selectedItem === index ? 'white' : 'red',
							}}
							key={title}
							onClick={() => setSelectedItem(index)}>
							{title}
						</button>
					))}
			</div>
			{/* QUANTITY AND ADD BUTTON */}
			<div className='flex justify-between items-center'>
				{/* QUANTITY */}
				<div className='flex justify-between w-full p-3 ring-1 ring-red-400'>
					<span>Quantity</span>
					<div className='flex gap-4 items-center'>
						{/* DECREASE */}
						<button
							type='button'
							onClick={() =>
								setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
							}>
							{'<'}
						</button>
						{/* NUMBER */}
						<span className='w-1 flex items-center justify-center'>
							{quantity}
						</span>
						{/* INCREASE */}
						<button
							type='button'
							onClick={() =>
								setQuantity((prev) =>
									prev === 9 ? 9 : prev + 1
								)
							}>
							{'>'}
						</button>
					</div>
				</div>
				{/* CART BUTTON */}
				<button
					className='bg-red-500 w-40 p-3 text-white ring-1 ring-red-500'
					onClick={handleCart}>
					Add to Cart
				</button>
			</div>
		</div>
	);
}



