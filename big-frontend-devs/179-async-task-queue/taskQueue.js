// how we can add support for retry

const _noop = () => {}

class AsyncTaskQueue {
	constructor(concurrency) {
		this.concurrency = concurrency;
		this.tasks = [];
		this.taskInProgress = 0;
	}

	executor(task) {
		task()
			.then(console.log)
			.catch(console.log)
			.finally(() => {
				this.taskInProgress--;
				this.execute();
			})
	}

	getTaksToExecute() {
		let maxTaskCanBePicked= this.concurrency - this.taskInProgress;
		let count = Math.min(maxTaskCanBePicked, this.tasks.length);
		const tasksToExecute = [];
		while(count) {
			const task = this.tasks.shift();
			tasksToExecute.push(task);
			count--;
		}
		return tasksToExecute;
	}

	execute() {
		const tasksToExecute = this.getTaksToExecute();
		while(tasksToExecute.length) {
			const task = tasksToExecute.shift();
			this.taskInProgress++;
			this.executor(task);
		}
	}

	queue(task) {
		this.tasks.push(task);
		this.execute();
	}
}


const task1 = () => new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve("Task 1")
	}, 5000);
});

// const task2 = () => new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		reject("Task 2")
// 	}, 500)
// });

const task3 = () => Promise.resolve("Task 3")

const task2 = () => Promise.resolve("Tasks 2");

// const task3 = () => new Promise((resolve) => {
// 	setTimeout(() => {
// 		resolve("Task 3")
// 	}, 4000)
// })

const asyncTaskQueue = new AsyncTaskQueue(2);

asyncTaskQueue.queue(task1);
asyncTaskQueue.queue(task2);
asyncTaskQueue.queue(task3);
