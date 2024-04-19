'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

const SuccessPage = () => {
	/* use this to search for parameters in a url string/link */
	const searchParams = useSearchParams();

	/* payment_intent is gotten from the url link that equals the intent_id */
	const payment_intent = searchParams.get('payment_intent');

	const router = useRouter();

	useEffect(() => {
		const makeRequest = async () => {
			try {
				await fetch(
					`http://localhost:3000/api/confirm/${payment_intent}`,
					{
						method: 'PUT',
					}
				);
				router.push('/orders');
			} catch (error) {
				console.log('get success error =>', error);
			}
		};
		makeRequest();
	}, [payment_intent, router]);

	return (
		<div>
			<p>
				Payment Successfull. You are being redirected to the Orders
				page, please do not close the page
			</p>
		</div>
	);
};

export default SuccessPage;
