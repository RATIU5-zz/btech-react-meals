import React from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
	const [amountIsValid, setAmountIsValid] = React.useState(true);
	const amountInputRef = React.useRef();

	const submitHandler = (event) => {
		event.preventDefault();

		const enteredAmount = +amountInputRef.current.value.trim();

		if (enteredAmount < 1 || enteredAmount > 5) {
			setAmountIsValid(false);
			return;
		} else setAmountIsValid(true);

		props.onAddToCart(enteredAmount);
	};

	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<Input
				ref={amountInputRef}
				label="Amount"
				input={{
					id: "amount_" + props.id,
					type: "number",
					min: "1",
					max: "5",
					step: "1",
					defaultValue: "1",
				}}
			/>
			<button>+ Add</button>
			{!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
		</form>
	);
};

export default MealItemForm;
