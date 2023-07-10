import logger from "./logger";

export default (name: string, timeout: number) => async (): Promise<string> => {
  return await new Promise((resolve, reject) => {
    logger(`TASK: ${name} start.`);
    setTimeout(() => {
      logger(`TASK: ${name} end.`);
      try {
        resolve(name);
      } catch {
        logger(`TASK: ${name} failed.`);
        reject("failed");
      }
    }, timeout);
  });
};
