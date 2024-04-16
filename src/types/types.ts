export type MenuType = {
	id: string;
	slug: string;
	title: string;
	desc?: string;
	img?: string;
	color: string;
}[];

export type ProductType = {
	id: string;
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
	products: CartItemType[];
	intent_id?: String;
	userEmail: string;
	status: string;
};

export type CartItemType = {
	id: string;
	title: string;
	img?: string;
	price: number;
	optionTitle?: String;
	quantity: number;
};

export type CartType = {
	products: CartItemType[];
	totalItems: number;
	totalPrice: number;
};

export type ActionTypes = {
	addToCart: (item: CartItemType) => void;
	removeFromCart: (item: CartItemType) => void;
};
