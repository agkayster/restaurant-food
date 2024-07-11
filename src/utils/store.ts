import { ActionTypes, CartType } from '@/types/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/* we must declare our initial state */
const INITIAL_STATE = {
	products: [],
	totalItems: 0,
	totalPrice: 0,
};

// export const useCartStore = create(
// 	persist<CartType & ActionTypes>(
// 		(set, get) => ({
// 			products: INITIAL_STATE.products,
// 			totalItems: INITIAL_STATE.totalItems,
// 			totalPrice: INITIAL_STATE.totalPrice,

// 			/* we take the item and push into our products array, everything goes into the cart */
// 			addToCart(item) {
// 				/* we are getting the products inside the state */
// 				const products = get().products;

// 				/* check whether the product(s) exist in state */
// 				const productsInState = products.find(
// 					(product) => product.optionTitle === item.optionTitle
// 				);

// 				/* if productInState exist, we do something */
// 				if (productsInState) {
// 					console.log('get state updated products =>', products);
// 					const updatedProducts = products.map((product) =>
// 						product.optionTitle === productsInState.optionTitle
// 							? {
// 									...item,
// 									quantity: item.quantity + product.quantity,
// 									price: item.price + product.price,
// 							  }
// 							: item
// 					);

// 					// console.log(
// 					// 	'get state after updated products =>',
// 					// 	products
// 					// );
// 					// console.log('get updated products =>', updatedProducts);
// 					let finalUpdatedProducts: any;
// 					for (const prod of products) {
// 						for (const ele of updatedProducts) {
// 							/* prod.optionTitle = "medium" and ele.optionTitle = "small".
// 							updatedProducts means increasing the number of items of the same product
// 							*/
// 							if (prod.optionTitle !== ele.optionTitle) {
// 								finalUpdatedProducts = [prod];
// 								/* the latest element in updatedProducts with all the updates and additions always appears in index 0, first element while oldest element appears in index 1 */
// 								finalUpdatedProducts.push(updatedProducts[0]);
// 							} else {
// 								finalUpdatedProducts = [...updatedProducts];
// 							}
// 						}
// 					}
// 					// console.log('get new updated =>', finalUpdatedProducts);

// 					/* we add "finalUpdatedProducts" into state */
// 					set((state) => ({
// 						products: finalUpdatedProducts,
// 						totalItems: state.totalItems + item.quantity,
// 						totalPrice: state.totalPrice + item.price,
// 					}));
// 				} else {
// 					set((state) => ({
// 						products: [...state.products, item],
// 						totalItems: state.totalItems + item.quantity, // => add up total items in our cart
// 						totalPrice: state.totalPrice + item.price, // => add up total price in our cart
// 					}));
// 				}
// 			},

// 			/* remove item(s) from cart using filter method */
// 			removeFromCart(item) {
// 				set((state) => ({
// 					products: state.products.filter(
// 						(product) => product.optionTitle !== item.optionTitle
// 					),
// 					totalItems: state.totalItems - item.quantity, // => once item is removed, reduce total items
// 					totalPrice: state.totalPrice - item.price, // => once item is removed, reduce total price
// 				}));
// 			},
// 		}),
// 		{ name: 'cart' }
// 	)
// );
export const useCartStore = create(
	persist<CartType & ActionTypes>(
		(set, get) => ({
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
						(product) => product.price !== item.price
					),
					totalItems: state.totalItems - item.quantity, // => once item is removed, reduce total items
					totalPrice: state.totalPrice - item.price, // => once item is removed, reduce total price
				}));
			},
		}),
		{ name: 'cart' }
	)
);

// export const useCartStore = create(
// 	persist<CartType & ActionTypes>(
// 		(set, get) => ({
// 			products: INITIAL_STATE.products,
// 			totalItems: INITIAL_STATE.totalItems,
// 			totalPrice: INITIAL_STATE.totalPrice,

// 			/* we take the item and push into our products array, everything goes into the cart */
// 			addToCart(item) {
// 				/* we are getting the products inside the state */
// 				const products = get().products;

// 				/* check whether the product(s) exist in state */
// 				const productsInState = products.find(
// 					(product) => product.id === item.id
// 				);

// 				/* if productInState exist, we do something */
// 				if (productsInState) {
// 					const updatedProducts = products.map((product) =>
// 						product.id === productsInState.id
// 							? {
// 									...item,
// 									quantity: item.quantity + product.quantity,
// 									price: item.price + product.price,
// 							  }
// 							: item
// 					);

// 					/* we add "updatedProduct" into state */
// 					set((state) => ({
// 						products: updatedProducts,
// 						totalItems: state.totalItems + item.quantity,
// 						totalPrice: state.totalPrice + item.price,
// 					}));
// 				} else {
// 					set((state) => ({
// 						products: [...state.products, item],
// 						totalItems: state.totalItems + item.quantity, // => add up total items in our cart
// 						totalPrice: state.totalPrice + item.price, // => add up total price in our cart
// 					}));
// 				}
// 			},

// 			/* remove item(s) from cart using filter method */
// 			removeFromCart(item) {
// 				set((state) => ({
// 					products: state.products.filter(
// 						(product) => product.id !== item.id
// 					),
// 					totalItems: state.totalItems - item.quantity, // => once item is removed, reduce total items
// 					totalPrice: state.totalPrice - item.price, // => once item is removed, reduce total price
// 				}));
// 			},
// 		}),
// 		{ name: 'cart' }
// 	)
// );
