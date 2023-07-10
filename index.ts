console.log("init");

import Queue from "./src/Queue";
import createTask from "./src/utils/createTask";

const q = new Queue();

const t1 = createTask("task 1", 5000);
const t2 = createTask("task 2", 1000);

q.add(t1);
q.add(t2);

q.processItems();
