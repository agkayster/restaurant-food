import { ActionTypes, CartType } from '@/types/types';
import { create } from 'zustand';

/* we must declare our initial state */
const INITIAL_STATE = {
	products: [],
	totalItems: 0,
	totalPrice: 0,
};

export const useCartStore = create<CartType & ActionTypes>((set, get) => ({
	products: INITIAL_STATE.products,
	totalItems: INITIAL_STATE.totalItems,
	totalPrice: INITIAL_STATE.totalPrice,

	/* we take the item and push into our products array, everything goes into the cart */
	addToCart(item) {
		set((state) => ({
			products: [...state.products, item],
			totalItems: state.totalItems + item.quantity, // => add up total items in our cart
			totalPrice: state.totalPrice + item.price, // => add up total price in our cart
		}));
	},

	/* remove item(s) from cart using filter method */
	removeFromCart(item) {
		set((state) => ({
			products: state.products.filter(
				(product) => product.id !== item.id
			),
			totalItems: state.totalItems - item.quantity, // => once item is removed, reduce total items
			totalPrice: state.totalPrice - item.price, // => once item is removed, reduce total price
		}));
	},
}));
