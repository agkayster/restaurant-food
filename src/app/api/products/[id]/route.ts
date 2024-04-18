import { getAuthSession } from '@/utils/auth';
import prisma from '@/utils/connect';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
	params: { id: string };
}

// GET SINGLE PRODUCT
export const GET = async (req: NextRequest, { params }: Props) => {
	const { id } = params;
	try {
		// const body = await req.json();

		const product = await prisma.product.findUnique({
			where: {
				id: id,
			},
		});
		return new NextResponse(JSON.stringify(product), { status: 200 });
	} catch (error) {
		console.log('get api order id error =>', error);
		return new NextResponse(
			JSON.stringify({ message: 'Something went wrong!' }),
			{ status: 500 }
		);
	}
};

// DELETE SINGLE PRODUCT

export const DELETE = async (
	req: NextRequest,
	{ params }: { params: { id: string } }
) => {
	const { id } = params;

	/** check for authentication */
	const session = await getAuthSession();

	/* if user is admin */
	if (session?.user.isAdmin) {
		try {
			await prisma.product.delete({
				where: {
					id: id,
				},
			});

			return new NextResponse(
				JSON.stringify('Product has been deleted!'),
				{
					status: 200,
				}
			);
		} catch (err) {
			console.log(err);
			return new NextResponse(
				JSON.stringify({ message: 'Something went wrong!' }),
				{ status: 500 }
			);
		}
	}
	return new NextResponse(
		JSON.stringify({ message: 'You are not allowed!' }),
		{
			status: 403,
		}
	);
};
