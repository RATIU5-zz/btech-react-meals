import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

import classes from "./AvailableMeals.module.css";
import React from "react";
import useHTTP from "../../hooks/use-http";

const AvailableMeals = () => {
	const [meals, setMeals] = React.useState([]);
	const { error, isLoading, sendRequest } = useHTTP();

	React.useEffect(() => {
		const applyData = (data) => {
			const loadedMeals = [];
			for (const key in data) {
				loadedMeals.push({
					id: key,
					name: data[key].name,
					description: data[key].description,
					price: data[key].price,
				});
			}
			setMeals(loadedMeals);
		};

		sendRequest(
			{ url: "https://react-http-2f902-default-rtdb.firebaseio.com/meals.json" },
			applyData,
		);
	}, []);

	const renderMealData = () => {
		if (error) {
			return (
				<section className={classes.mealsError}>
					<h3>{error}</h3>
				</section>
			);
		}
		if (isLoading) {
			return (
				<section className={classes.mealsLoading}>
					<h3>Loading...</h3>
				</section>
			);
		}
		return meals.map((m) => (
			<MealItem
				key={m.id}
				id={m.id}
				name={m.name}
				description={m.description}
				price={m.price}
			/>
		));
	};

	return (
		<section className={classes.meals}>
			<Card>
				<ul>{renderMealData()}</ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;
