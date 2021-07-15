import React from "react";

const useHTTP = () => {
	const [error, setError] = React.useState(null);
	const [isLoading, setIsLoading] = React.useState(false);

	const sendRequest = React.useCallback(async (conf, applyData) => {
		setIsLoading(true);
		setError(null);
		try {
			if (!conf.url)
				throw new Error(`sendRequest requires an object with at least a 'url' property`);

			const res = await fetch(conf.url, {
				method: conf.method || "GET",
				headers: conf.headers || {},
				body: conf.body ? JSON.stringify(conf.body) : null,
			});
			if (!res.ok)
				throw new Error(`Something went wrong! (${res.status}: ${res.statusText})`);

			const json = await res.json();
			applyData(json);
		} catch (err) {
			setError(err.message || "Something went wrong!");
		}
		setIsLoading(false);
	}, []);

	return {
		error,
		isLoading,
		sendRequest,
	};
};

export default useHTTP;
