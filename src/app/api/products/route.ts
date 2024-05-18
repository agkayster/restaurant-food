import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/connect';
import { getAuthSession } from '@/utils/auth';

// FETCH ALL PRODUCTS

export const GET = async (req: NextRequest) => {
	const { searchParams } = new URL(req.url);

	const cat = searchParams.get('cat');

	try {
		const products = await prisma.product.findMany({
			where: {
				...(cat ? { catSlug: cat } : { isFeatured: true }),
			},
		});

		/* converts all our data into a string including numbers */
		return new NextResponse(JSON.stringify(products), {
			status: 200,
		});
	} catch (error) {
		console.log(error);
		return new NextResponse(
			JSON.stringify({ message: 'Something went wrong' }),
			{ status: 500 }
		);
	}
};

/* CREATE PRODUCTS */
export const POST = async (req: NextRequest) => {
	const session = await getAuthSession();

	/* if user is signed on */
	if (session) {
		/* request our body from frontend CartPage request */
		const body = await req.json();

		try {
			if (session.user.isAdmin) {
				const product = await prisma.product.create({
					data: body,
				});

				/* converts all our data into a string including numbers */
				return new NextResponse(JSON.stringify(product), {
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
