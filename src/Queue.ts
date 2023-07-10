export default class Queue {
  items: (() => Promise<any>)[] = [];

  // Want to keep track of whether tasks are already being ran
  isRunningTasks: boolean = false;

  add<P>(p: () => Promise<P>): Promise<P> {
    // Need to return a promise back through the interface, we do not wanto run be running the task as soon as its added
    // This means we need to wrap it
    const task = new Promise<P>((resolve, reject) => {
      const taskWrapper = async () => {
        const result = await p();
        resolve(result);
      };

      this.items.push(taskWrapper);

      // We have new items in our queue, lets run those tasks
      this.processItems();
    });

    return task;
  }

  async processItems() {
    // If we are aleady looping over tasks, no need to do anything
    if (this.isRunningTasks) return;

    this.isRunningTasks = true;

    while (this.items.length > 0) {
      // Grab first task to run (FIFO) & remove from list
      const task = this.items.shift();

      // Wait for task to resolve before continue loop
      await task!();
    }

    this.items.forEach(async (task) => {
      await task();
    });

    this.isRunningTasks = false;
  }
}
