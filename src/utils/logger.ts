const leadingZero = (num: number) => `0${num}`.slice(-2);

export default (msg: string, ...args: any) => {
  const date = new Date();

  const hrs = leadingZero(date.getHours());
  const mins = leadingZero(date.getMinutes());
  const seconds = leadingZero(date.getSeconds());

  const time = `${hrs}:${mins}:${seconds}`;

  console.log(`${time}: ${msg}`, ...args);
};
