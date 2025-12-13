/*

	Problem: Task Scheduling with Dependencies in JavaScript
	
	Context:
		- You have a list of tasks, each represented as an async function or a function returning a Promise. 
		- Some tasks depend on others (i.e., task B can only run after task A finishes). You want to:
			- Run tasks respecting their dependencies.
 			- Maximize concurrency (run independent tasks in parallel).
			- Handle errors gracefully.
			- Optionally allow cancellation or timeout.

*/



const scheduleTasks = () => {

}


const init = () => {
	const tasks = {
	  A: () => new Promise(r => setTimeout(() => r('A done'), 1000)),
	  B: () => new Promise(r => setTimeout(() => r('B done'), 500)),
	  C: () => new Promise(r => setTimeout(() => r('C done'), 300)),
	};

	const dependencies = {
	  B: ['A', 'C'],
	  C: ['A', 'B'],
	  D: ['A'],
	};

	scheduleTasks(tasks, dependencies)
	  .then(results => console.log('All done:', results))
	  .catch(err => console.error('Error:', err));
}

init();