console.log("init");

import Queue from "./src/Queue";
import createTask from "./src/utils/createTask";

const q = new Queue();

const t1 = createTask("task 1", 500);
const t2 = createTask("task 2", 100);

q.add(t1);
q.add(t2);

q.processItems();
