import { useCallback, useState } from 'react';

const useHttp = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const sendRequest = useCallback(async (requestConfig, transData) => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(
				/**GET methods do not need the method,header,or body attached to call so I used a ternary expression to get the values
				 * if passed, other with pass GET with null values
				 */
				requestConfig.url,
				{
					method: requestConfig.method ? requestConfig.method : 'GET',
					headers: requestConfig.headers ? requestConfig.headers : {},
					body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
				}
			);

			if (!response.ok) {
				throw new Error('Request failed!');
			}

			const data = await response.json();
			transData(data);
		} catch (err) {
			setError(err.message || 'Something went wrong!');
		}
		setIsLoading(false);
	}, []);

	return {
		isLoading, // = isLoading: isLoading,
		error, // = error: error,
		sendRequest, // = sendRequest: sendRequest
	};
};

export default useHttp;
