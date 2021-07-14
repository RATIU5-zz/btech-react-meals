import React from "react";
import CartContext from "./cart-context";

const DEFAULT_CART_STATE = {
	items: [],
	totalAmount: 0,
};

const cartReducer = (state, action) => {
	if (action.type === "ADD_ITEM") {
		const updatedItems = state.items.concat(action.item);
		const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}

	return DEFAULT_CART_STATE;
};

const CartProvider = (props) => {
	const [cartState, cartDispatchAction] = React.useReducer(cartReducer, DEFAULT_CART_STATE);

	const addItemToCartHandler = (item) => {
		cartDispatchAction({ type: "ADD_ITEM", item: item });
	};

	const removeItemFromCartHandler = (id) => {
		cartDispatchAction({ type: "REMOVE_ITEM", id: id });
	};

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
	};

	return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};
export default CartProvider;
