import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/connect';
import { getAuthSession } from '@/utils/auth';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool } from '@neondatabase/serverless';

// FETCH ALL PRODUCTS

// export const runtime = 'edge';

export const GET = async (req: NextRequest) => {
	const { searchParams } = new URL(req.url);

	const cat = searchParams.get('cat');

	// const neon = new Pool({
	// 	connectionString: process.env.POSTGRES_PRISMA_URL,
	// });
	// const adapter = new PrismaNeon(neon);
	// const prisma = new PrismaClient({ adapter });

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

	const neon = new Pool({
		connectionString: process.env.POSTGRES_PRISMA_URL,
	});
	const adapter = new PrismaNeon(neon);
	const prisma = new PrismaClient({ adapter });

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
