import { describe, it } from "@jest/globals";

import Queue from "./Queue";
import logger from "./utils/logger";
import createTask from "./utils/createTask";
import { time } from "console";

jest.mock("./utils/logger", () => {
  return {
    default: jest.fn(() => ""),
  };
});

const dummyTask =
  (name: string, timeout: number) => async (): Promise<string> => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        console.log("begin", name);
        logger(`${name}`);
        resolve(name);
      }, timeout);
    });
  };

describe("Queue", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it.only("The task order is respected", (done) => {
    const task1 = dummyTask("A", 100);
    const task2 = dummyTask("B", 0);
    const task3 = dummyTask("C", 0);

    const q = new Queue();
    q.add(task1);
    q.add(task2);

    q.processItems();

    jest.advanceTimersByTime(100);

    setTimeout(() => {
      done();
    }, 1000);

    // expect(logger).toHaveBeenCalledTimes(2);

    // expect(logger).toHaveBeenNthCalledWith(1, "A");
    // expect(logger).toHaveBeenNthCalledWith(2, "B");
  });

  it("Test that we are only running one task at a time?", () => {
    const task1 = dummyTask("A", 1000);
    const task2 = dummyTask("B", 500);

    const q = new Queue();
    q.add(task1);
    q.add(task2);

    q.processItems();

    // move timer on and check that logger only called 1x
  });
});
