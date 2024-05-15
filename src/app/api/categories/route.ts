// import prisma from '@/utils/connect';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool } from '@neondatabase/serverless';

// export const runtime = 'edge';

// WE FETCH ALL THE CATEGORIES FROM PRISMA STUDIO

export const GET = async () => {
	const neon = new Pool({
		connectionString: process.env.POSTGRES_PRISMA_URL,
	});
	const adapter = new PrismaNeon(neon);
	const prisma = new PrismaClient({ adapter });
	try {
		const categories = await prisma.category.findMany();

		return new NextResponse(JSON.stringify(categories), {
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
