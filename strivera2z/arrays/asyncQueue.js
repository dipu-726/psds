
const _noop = () => {};

class AsyncTaskQueue {
    concurrency: number = 0;
    tasksQueue: any[] = [];
    current: number  = 0;
    lastExecTaskIdx = 0;

    constructor(concurrency: number) {
        this.concurrency = concurrency;
    }
    
    appendTask(task: () => Promise<void>) {
        this.tasksQueue.push({
            task,
            isProcessed: false,
        })
        console.log("append tasks", this.tasksQueue.length)
        
    }

    onComplete() {
        this.manageTask();
    }

    processTask(tasks : any[]) {
        tasks.forEach((taskItem, idx) => {
            this.current++;
            taskItem.task()
                .then(_noop)
                .catch(_noop)
                .finally(() => {
                    --this.current;
                    taskItem.isProcessed = true;
                    this.lastExecTaskIdx = Math.max(idx, this.lastExecTaskIdx);
                    this.manageTask();
                })
        })
    }

    manageTask () {
        if (this.current >= this.concurrency) return;
        if (this.lastExecTaskIdx === this.tasksQueue.length - 1) return
        const maxTaskCanBePicked = this.concurrency - this.current;
        const tasksToProcess = this.tasksQueue.slice(this.lastExecTaskIdx, this.lastExecTaskIdx+maxTaskCanBePicked+1)
        this.processTask(tasksToProcess);
    }
    
    queue(task) {
        this.appendTask(task);
        this.manageTask()
    }
}

const queue = new AsyncTaskQueue(2); // Allow up to 2 tasks to run concurrently
// Example async tasks
const task1 = () => new Promise((resolve) => setTimeout(() => resolve("Task 1 done"), 5000));
const task2 = () => new Promise((resolve, reject) => setTimeout(() => reject("Task 2 failed"), 500));
const task3 = () => new Promise((resolve) => setTimeout(() => resolve("Task 3 done"), 200));
// Queue tasks
queue.queue(task1); // Starts immediately
queue.queue(task2); // Starts immediately (concurrency = 2)
queue.queue(task3); // 