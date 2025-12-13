const logOne = () => {
  console.log("One is logged");
};

const logTwo = () => {
  console.log("Two is logged");
};

const asyncLogOne = async () => {
  const result = await Promise.resolve(1);
  console.log("Async : One is logged");
  return;
}


const sleep = (duration = 1000) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, duration);
  })
}

const sleep1 = async () => {
  return sleep(4000)
    .then(() => {
      console.log("Sleep 1 is executed");
    })
    .catch(() => {
      console.log("Failed");
    })
}

const _noop = () => {};

class Task {
  constructor(fn) {
    this.task = fn;
  }

  execute() {
    if (!this.task) {
      throw new Error("Expected function found", typeof fn);
    }
    this.task();
  }
}

class TaskRunner {
  #taskList;
  #concurrency;
  #onComplete;
  #batch;

  constructor(taskList, concurrency, onComplete) {
    this.#taskList = taskList ?? [];
    this.#concurrency = concurrency ?? 0;
    this.#onComplete = onComplete ?? _noop;
    this.#batch = 0;
    return this;
  }

  setConcurrency(concurrency) {
    if (typeof concurrency !== 'number') {
      throw new Error("Expected number found", typeof concurrency);
    }
    if (concurrency < 0) {
      throw new Error("Expected positive number got negative");
    }
    this.#concurrency = concurrency;
    return this;
  }

  addTask(task) {
    this.#taskList = this.#taskList.concat(task);
    return this;
  }

  async #executeTasks(taskList, concurrency) {
    this.#batch = this.#batch + 1;
    console.log("Running batch", this.#batch);
    const tasksToRun = taskList.slice(0, concurrency);
    const taskRan = tasksToRun.map(task => task.run());
    try {
      await Promise.allSettled(taskRan);

      if (taskList.length > concurrency) {
        const remainingTaskList = taskList.splice(concurrency);
        return this.#executeTasks(remainingTaskList, concurrency);
      }
    } catch (e) {
      console.log(`Batch ${this.#batch} Failed`, e);
    } finally {
    }

  }

  run() {
    const promiseExecutor = (resolve, reject) => {
      this.#executeTasks(this.#taskList, this.#concurrency)
        .then(resolve)
        .catch(reject)
        .finally(this.#onComplete)
    }

    return new Promise(promiseExecutor)
  }
}


const taskRunner = new TaskRunner();

// taskRunner
// 	.setConcurrency(1);
// 	.addTask(new Task(logOne))
// 	.addTask(new Task(logTwo))
// 	.addTask(new Task(asyncLogOne))
// 	.execute();


taskRunner
  .setConcurrency(2)
  .addTask(logOne)
  .addTask(logTwo)
  .addTask(asyncLogOne)
  .addTask(sleep1)
  .addTask(logTwo)
  .run();
