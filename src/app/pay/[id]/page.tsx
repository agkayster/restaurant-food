'use client';

import CheckoutForm from '@/components/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const PayPage = ({ params }: { params: { id: string } }) => {
	const [clientSecret, setClientSecret] = useState('');

	const { id } = params;

	useEffect(() => {
		const makeRequest = async () => {
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/api/create-intent/${id}`,
					{
						method: 'POST',
					}
				);
				const data = await res.json();
				console.log('get client secret =>', data.clientSecret);
				setClientSecret(data.clientSecret);
			} catch (err) {
				console.log("check error =>",err);
			}
		};

		makeRequest();
	}, [id]);

	const options: StripeElementsOptions = {
		clientSecret,
		appearance: {
			theme: 'stripe',
		},
	};

	return (
		<div>
			{clientSecret && (
				<Elements options={options} stripe={stripePromise}>
					<CheckoutForm />
				</Elements>
			)}
		</div>
	);
};

export default PayPage;
// 'use client';
// import CheckoutForm from '@/components/CheckoutForm';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
// import React, { useEffect, useState } from 'react';

// /* using ! in typescript means the variable exists */
// const stripePromise = loadStripe(
// 	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
// );

// const PaymentPage = ({ params }: { params: { id: string } }) => {
// 	const [clientSecret, setClientSecret] = useState('');
// 	const { id } = params;

// 	/* useEffect hook to create our intent */
// 	useEffect(() => {
// 		const makeRequest = async () => {
// 			try {
// 				/* pass in the order id into the api. use id to find our order and update the intent-id */
// 				const res = await fetch(
// 					`http://localhost:3000/api/create-intent/${id}`,
// 					{
// 						method: 'POST',
// 					}
// 				);
// 				const data = await res.json();
// 				setClientSecret(data.clientSecret);
// 			} catch (error) {
// 				console.log('get pay error =>', error);
// 			}
// 		};
// 		makeRequest();
// 	}, [id]);

// 	const options: StripeElementsOptions = {
// 		clientSecret,
// 		appearance: {
// 			theme: 'stripe',
// 		},
// 	};

// 	return (
// 		<div>
// 			{clientSecret && (
// 				<Elements options={options} stripe={stripePromise}>
// 					<CheckoutForm />
// 				</Elements>
// 			)}
// 		</div>
// 	);
// };

// export default PaymentPage;
