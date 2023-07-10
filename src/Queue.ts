export default class Queue {
  items: (() => Promise<any>)[] = [];

  add<P>(p: () => Promise<P>): Promise<P> {
    // Need to return a promise back through the interface, without running the task
    // This means we need to wrap it
    const task = new Promise<P>((resolve, reject) => {
      const taskWrapper = async () => {
        const result = await p();
        resolve(result);
      };

      this.items.push(taskWrapper);
    });

    return task;
  }

  async processItems() {
    // While loop to work through task list and allow better control
    while (this.items.length > 0) {
      // Grab first task to run (FIFO) & remove from list
      const task = this.items.shift();

      // Wait for task to resolve before continue loop
      await task!();
    }

    this.items.forEach(async (task) => {
      await task();
    });
  }
}
