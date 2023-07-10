export default class Queue {
  items: (() => Promise<any>)[] = [];

  add<P>(p: () => Promise<P>): Promise<P> {
    const task = new Promise<P>((resolve, reject) => {});

    this.items.push(() => task);

    console.log("item length", this.items.length);

    return task;
  }
}
