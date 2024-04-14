'use client';
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { OrderType } from '@/types/types';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const OrdersPage = () => {
	const { data: session, status } = useSession();

	const router = useRouter();

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.push('/');
		}
	});

	const { isPending, error, data } = useQuery({
		queryKey: ['orders'],
		queryFn: () =>
			fetch('http://localhost:3000/api/orders').then((res) => res.json()),
	});

	if (isPending || status === 'loading') return 'Loading...';

	if (error) return `An error has occurred:  ${error.message}`;

	return (
		<div className='p-4 lg:px-10 xl:p-20'>
			<table className='w-full border-separate border-spacing-3'>
				<thead className=''>
					<tr className='text-left'>
						<th className='hidden md:block'>Order ID</th>
						<th>Date</th>
						<th>Price</th>
						<th className='hidden md:block'>Products</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody className=''>
					{data &&
						data.map(
							({
								id,
								createdAt,
								price,
								products,
								status,
								intent_id,
								userEmail,
							}: OrderType) => (
								<tr
									key={id}
									className='text-sm md:text-base bg-red-50'>
									<td className='hidden md:block py-6 px-1'>
										{id}
									</td>
									<td className='py-6 px-1'>
										{createdAt.toString()}
									</td>
									<td className='py-6 px-1'>{price}</td>
									{products.map(({ title }) => (
										<td
											key={title}
											className='hidden md:block py-6 px-1'>
											{title}
										</td>
									))}
									<td className='py-6 px-1'>{status}</td>
								</tr>
							)
						)}
				</tbody>
			</table>
		</div>
	);
};

export default OrdersPage;
