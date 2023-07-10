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

    console.log("item length", this.items.length);

    return task;
  }

  processItems() {
    this.items.forEach(async (task) => {
      await task();
    });
  }
}
