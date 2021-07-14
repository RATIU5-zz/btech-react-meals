import React from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
	const cartCtx = React.useContext(CartContext);
	const numberOfCartItems = cartCtx.items.reduce((cur, item) => {
		return cur + item.amount;
	}, 0);

	const [btnIsHighlighted, setBtnIsHighlighted] = React.useState(false);
	const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ""}`;

	React.useEffect(() => {
		if (cartCtx.items.length === 0) return;
		setBtnIsHighlighted(true);

		const timer = setTimeout(() => {
			setBtnIsHighlighted(false);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [cartCtx.items]);

	return (
		<button className={btnClasses} onClick={props.onClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={classes.badge}>{numberOfCartItems}</span>
		</button>
	);
};

export default HeaderCartButton;
