import React from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";

const Cart = (props) => {
	const cartCtx = React.useContext(CartContext);

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
	const hasItems = cartCtx.items.length > 0;

	const cartItemAddHandler = (item) => {};

	const cartItemRemoveHandler = (id) => {};

	const cartItems = (
		<ul className={classes["cart-items"]}>
			{cartCtx.items.map((i) => (
				<CartItem
					key={i.id}
					name={i.name}
					amount={i.amount}
					price={i.price}
					onRemove={cartItemRemoveHandler.bind(null, i.id)}
					onAdd={cartItemAddHandler.bind(null, i)}
				/>
			))}
		</ul>
	);

	return (
		<Modal onClose={props.onClose}>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			<div className={classes.actions}>
				<button className={classes["button--alt"]} onClick={props.onClose}>
					Close
				</button>
				{hasItems && <button className={classes.button}>Order</button>}
			</div>
		</Modal>
	);
};

export default Cart;
