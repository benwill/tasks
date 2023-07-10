import { describe, it } from "@jest/globals";

import Queue from "./Queue";
import logger from "./utils/logger";
import createTask from "./utils/createTask";

jest.mock("./utils/logger", () => {
  return {
    default: jest.fn(),
  };
});

describe("Queue", () => {
  it("The task order is respected", async () => {
    const task1 = createTask("A", 100);
    const task2 = createTask("B", 0);
    const task3 = createTask("C", 50);

    const q = new Queue();
    const result1 = q.add(task1);
    const result2 = q.add(task2);
    const result3 = q.add(task3);

    const results = await Promise.all([result1, result2, result3]);

    expect(results).toEqual(["A", "B", "C"]);
  });

  it("Test that we are only running one task at a time?", async () => {
    // Use the logger to track when tasks start

    const task1 = createTask("A", 500);
    const task2 = createTask("B", 200);
    const task3 = createTask("C", 100);

    const q = new Queue();
    const result1 = q.add(task1);
    const result2 = q.add(task2);
    const result3 = q.add(task3);

    // Wait for all results before we check the logs
    // We should expect the start logs to always follow the end of the last task
    await Promise.all([result1, result2, result3]);

    expect(logger).toHaveBeenCalledTimes(6);
    expect(logger).toHaveBeenNthCalledWith(1, "TASK: A start.");
    expect(logger).toHaveBeenNthCalledWith(2, "TASK: A end.");
    expect(logger).toHaveBeenNthCalledWith(3, "TASK: B start.");
    expect(logger).toHaveBeenNthCalledWith(4, "TASK: B end.");
    expect(logger).toHaveBeenNthCalledWith(5, "TASK: C start.");
    expect(logger).toHaveBeenNthCalledWith(6, "TASK: C end.");
  });

  it("todo check for failed tasks", () => {});
});
