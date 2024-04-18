import prisma from '@/utils/connect';
import { NextRequest, NextResponse } from 'next/server';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(
	request: NextRequest,
	{ params }: { params: { orderId: string } }
) {
	const { orderId } = params;

	const order = await prisma.order.findUnique({
		where: {
			id: orderId,
		},
	});

	if (order) {
		const paymentIntent = await stripe.paymentIntents.create({
			amount: 100 * 100,
			currency: 'usd',
			automatic_payment_methods: {
				enabled: true,
			},
		});

		await prisma.order.update({
			where: {
				id: orderId,
			},
			data: { intent_id: paymentIntent.id },
		});

		return new NextResponse(
			JSON.stringify({ clientSecret: paymentIntent.client_secret }),
			{ status: 200 }
		);
	}
	return new NextResponse(JSON.stringify({ message: 'Order not found!' }), {
		status: 404,
	});
}

// import prisma from '@/utils/connect';
// import { NextResponse } from 'next/server';

// // This is your test secret API key which we use to initialize our stripe payment
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// export const POST = async ({ params }: { params: { orderId: string } }) => {
// 	/* retrieve the order id */
// 	const { orderId } = params;

// 	const order = await prisma.order.findUnique({
// 		where: {
// 			id: orderId,
// 		},
// 	});

// 	if (order) {
// 		// Create a PaymentIntent with the order amount and currency
// 		const paymentIntent = await stripe.paymentIntents.create({
// 			amount: 100 * 100,
// 			currency: 'usd',
// 			// In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
// 			automatic_payment_methods: {
// 				enabled: true,
// 			},
// 		});

// 		await prisma.order.update({
// 			where: {
// 				id: orderId,
// 			},
// 			data: { intent_id: paymentIntent.id },
// 		});

// 		return new NextResponse(
// 			/* use our client secret to create our checkout form */
// 			JSON.stringify({ clientSecret: paymentIntent.client_secret }),
// 			{
// 				status: 200,
// 			}
// 		);
// 	} else {
// 		return new NextResponse(
// 			JSON.stringify({ message: 'Order not found' }),
// 			{
// 				status: 404,
// 			}
// 		);
// 	}
// };
