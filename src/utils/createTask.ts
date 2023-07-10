import logger from "./logger";

export default (name: string, timeout: number) => async (): Promise<string> => {
  return await new Promise((resolve) => {
    logger(`TASK: ${name} start.`);
    setTimeout(() => {
      logger(`TASK: ${name} end.`);
      resolve(name);
    }, timeout);
  });
};
