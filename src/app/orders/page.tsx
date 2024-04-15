'use client';
import React, { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { OrderType } from '@/types/types';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'react-toastify';

const OrdersPage = () => {
	const { data: session, status } = useSession();

	/* shows details of the logged in user */
	console.log('get session in orders =>', session);

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

	const queryClient = useQueryClient();

	/* use this to update our use query fetch request above and also refresh the page to see the update */
	const mutation = useMutation({
		mutationFn: ({ id, status }: { id: string; status: string }) => {
			return fetch(`http://localhost:3000/api/orders/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(status),
			});
		},
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['orders'] });
		},
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>, id: string) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const input = form.elements[0] as HTMLInputElement;
		const status = input.value;

		mutation.mutate({ id, status });
		toast.success('The order status has been updated!');
	};

	if (isPending || status === 'loading') return 'Loading...';

	// if (error) return `An error has occurred:  ${error.message}`;

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
										{createdAt.toString().slice(0, 10)}
									</td>
									<td className='py-6 px-1'>{price}</td>
									{products.map(({ title }) => (
										<td
											key={title}
											className='hidden md:block py-6 px-1'>
											{title}
										</td>
									))}
									{session?.user.isAdmin ? (
										<td>
											<form
												className='flex flex-row gap-2 items-center justify-center'
												onSubmit={(e) =>
													handleSubmit(e, id)
												}>
												<input
													placeholder={status}
													type='text'
													className='p-2 ring-1 ring-red-100 rounded-md'
												/>
												<button
													type='submit'
													className='bg-red-400 p-2 rounded-full'>
													<Image
														src='/edit.png'
														alt='alt'
														width={20}
														height={20}
													/>
												</button>
											</form>
										</td>
									) : (
										<td className='py-6 px-1'>{status}</td>
									)}
								</tr>
							)
						)}
				</tbody>
			</table>
		</div>
	);
};

export default OrdersPage;
