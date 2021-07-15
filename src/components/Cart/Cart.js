import React from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import Checkout from "./Checkout";
import classes from "./Cart.module.css";

const Cart = (props) => {
	const cartCtx = React.useContext(CartContext);
	const [isCheckOut, setIsCheckOut] = React.useState(false);

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
	const hasItems = cartCtx.items.length > 0;

	const cartItemAddHandler = (item) => {
		cartCtx.addItem({ ...item, amount: 1 });
	};

	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};

	const orderHandler = () => {
		setIsCheckOut(true);
	};

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

	const modalActions = () => {
		return (
			<div className={classes.actions}>
				<button className={classes["button--alt"]} onClick={props.onClose}>
					Close
				</button>
				{hasItems && (
					<button className={classes.button} onClick={orderHandler}>
						Order
					</button>
				)}
			</div>
		);
	};

	return (
		<Modal onClose={props.onClose}>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{isCheckOut && <Checkout onCancel={props.onClose} />}
			{!isCheckOut && modalActions()}
		</Modal>
	);
};

export default Cart;
