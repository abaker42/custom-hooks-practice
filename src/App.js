import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {
	const [tasks, setTasks] = useState([]);

	//transform data from backend to match what we need to display in frontend

	const httpData = useHttp();
	const { isLoading, error, sendRequest: fetchTasks } = httpData;
	/**ABOVE TO LINES CAN ALSO BE WRITTEN LIKE THIS:
	 * const {isLoading, error, sendRequest} = useHttp({url: 'https://react-http-30b70-default-rtdb.firebaseio.com/tasks.json' }, transformTask);
	 */

	useEffect(() => {
		const transformTask = (tasksObj) => {
			const loadedTasks = [];

			for (const taskKey in tasksObj) {
				loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
			}

			setTasks(loadedTasks);
		};

		fetchTasks(
			{
				url: 'https://react-http-30b70-default-rtdb.firebaseio.com/tasks.json',
			},
			transformTask
		);
	}, [fetchTasks]);

	const taskAddHandler = (task) => {
		setTasks((prevTasks) => prevTasks.concat(task));
	};

	return (
		<React.Fragment>
			<NewTask onAddTask={taskAddHandler} />
			<Tasks
				items={tasks}
				loading={isLoading}
				error={error}
				onFetch={fetchTasks}
			/>
		</React.Fragment>
	);
}

export default App;
