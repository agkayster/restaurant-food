import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/connect';
import { getAuthSession } from '@/utils/auth';

// FETCH ALL ORDERS

export const GET = async (req: NextRequest) => {
	const session = await getAuthSession();

	/* if user is signed on */
	if (session) {
		try {
			/* if user is admin */
			if (session.user.isAdmin) {
				const orders = await prisma.order.findMany();
				return new NextResponse(JSON.stringify(orders), {
					status: 200,
				});
			}
			/* if user is not admin */
			const orders = await prisma.order.findMany({
				where: {
					userEmail: session.user.email!,
				},
			});

			return new NextResponse(JSON.stringify(orders), {
				status: 200,
			});
		} catch (error) {
			console.log(error);
			return new NextResponse(
				JSON.stringify({ message: 'Something went wrong' }),
				{ status: 500 }
			);
		}
	} else {
		return new NextResponse(
			JSON.stringify({ message: 'Not Authenticated' }),
			{ status: 401 }
		);
	}
};

/* CREATE ORDER */
export const POST = async (req: NextRequest) => {
	const session = await getAuthSession();

	/* if user is signed on */
	if (session) {
		/* request our body from frontend CartPage request */
		const body = await req.json();

		try {
			if (session.user) {
				const order = await prisma.order.create({
					data: body,
				});
				return new NextResponse(JSON.stringify(order), {
					status: 201,
				});
			}
		} catch (error) {
			console.log(error);
			return new NextResponse(
				JSON.stringify({ message: 'Something went wrong' }),
				{ status: 500 }
			);
		}
	} else {
		return new NextResponse(
			JSON.stringify({ message: 'Not Authenticated' }),
			{ status: 401 }
		);
	}
};
