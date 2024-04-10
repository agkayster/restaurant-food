export type MenuType = {
	id: string;
	slug: string;
	title: string;
	desc?: string;
	img?: string;
	color: string;
}[];

export type ProductType = {
	id: number;
	title: string;
	desc?: string;
	img?: string;
	price: number;
	options?: { title: string; additionalPrice: number }[];
};

export type OrderType = {
	id: string;
	createdAt: Date;
	price: number;
	products: { title: string }[];
	intent_id?: String;
	userEmail: string;
	status: string;
};
