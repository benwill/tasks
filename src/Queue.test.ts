import { describe, it } from "@jest/globals";

import Queue from "./Queue";
import logger from "./utils/logger";

jest.mock("./utils/logger", () => {
  return {
    default: jest.fn(() => ""),
  };
});

const dummyTask = (name: string, timeout: number = 0) => {
  return () => {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        logger(name);
        resolve(name);
      }, timeout);
    });
  };
};

describe("Queue", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("The task order is respected", () => {
    const task1 = dummyTask("A");
    const task2 = dummyTask("B");

    const q = new Queue();
    q.add(task1);
    q.add(task2);

    q.processItems();

    jest.advanceTimersByTime(10000);

    expect(logger).toHaveBeenNthCalledWith(1, "A");
    expect(logger).toHaveBeenNthCalledWith(2, "B");
  });

  it.only("Test that we are only running one task at a time?", () => {
    const task1 = dummyTask("A", 200);
    const task2 = dummyTask("B", 300);

    const q = new Queue();
    q.add(task1);
    q.add(task2);

    q.processItems();

    jest.advanceTimersByTime(200);

    expect(logger).toHaveBeenNthCalledWith(1, "A");
    expect(logger).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(100);

    expect(logger).toHaveBeenNthCalledWith(2, "B");
    expect(logger).toHaveBeenCalledTimes(2);
  });
});
