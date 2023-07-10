import { describe, it } from "@jest/globals";

import Queue from "./Queue";
import logger from "./utils/logger";

jest.mock("./utils/logger", () => {
  return {
    default: jest.fn(() => ""),
  };
});

describe("Queue", () => {
  it("The task order is respected", () => {
    const task1 = () => {
      return new Promise<string>((resolve) => {
        setTimeout(() => {
          logger("A");
          resolve("task1");
        }, 0);
      });
    };

    const task2 = () => {
      return new Promise<string>((resolve) => {
        setTimeout(() => {
          logger("A");
          resolve("task2");
        }, 0);
      });
    };

    const q = new Queue();
    q.add(task1);
    q.add(task2);

    expect(logger).toHaveBeenNthCalledWith(1, "A");
    expect(logger).toHaveBeenNthCalledWith(2, "B");
  });

  it("Test that we are only running one task at a time?", () => {
    console.log("todo");
  });
});
