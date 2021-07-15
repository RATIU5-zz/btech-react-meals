import React from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import Checkout from "./Checkout";
import classes from "./Cart.module.css";
import useHTTP from "../../hooks/use-http";

const Cart = (props) => {
	const cartCtx = React.useContext(CartContext);
	const [isCheckOut, setIsCheckOut] = React.useState(false);
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [didSubmit, setDidSubmit] = React.useState(false);

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

	const submitOrderHandler = async (userData) => {
		setIsSubmitting(true);
		await fetch("https://react-http-2f902-default-rtdb.firebaseio.com/orders.json", {
			method: "POST",
			body: JSON.stringify({
				user: userData,
				orderItems: cartCtx.items,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		setIsSubmitting(false);
		setDidSubmit(true);

		cartCtx.clearCart();
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

	const cartModalContent = () => {
		return (
			<>
				{cartItems}
				<div className={classes.total}>
					<span>Total Amount</span>
					<span>{totalAmount}</span>
				</div>
				{isCheckOut && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
				{!isCheckOut && modalActions()}
			</>
		);
	};

	const isLoadingContent = () => {
		return <p>Sending order...</p>;
	};

	const sentOrderContent = () => {
		return (
			<>
				<p>Order sent successfully</p>
				<div className={classes.actions}>
					<button className={classes.button} onClick={props.onClose}>
						Close
					</button>
				</div>
			</>
		);
	};

	return (
		<Modal onClose={props.onClose}>
			{!isSubmitting && !didSubmit && cartModalContent()}
			{isSubmitting && isLoadingContent()}
			{!isSubmitting && didSubmit && sentOrderContent()}
		</Modal>
	);
};

export default Cart;
