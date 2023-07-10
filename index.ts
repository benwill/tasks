import Queue from "./src/Queue";
import createTask from "./src/utils/createTask";

const q = new Queue();

const t1 = createTask("task 1", 1000);
const t2 = createTask("task 2", 3000);
const t3 = createTask("task 3", 2000);

const promise1 = q.add(t1);
const promise2 = q.add(t2);
const promise3 = q.add(t3);

// When promise 1 is done, lets kick off another task
promise1.then((res) => {
  const t4 = createTask("task 4", 1000);
  const promise4 = q.add(t4);
});
