export default (name: string, timeout: number) => {
  return () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(`done ${name}`);
        resolve(`${name} finished`);
      }, timeout);
    });
};
