export const sleep: (x: number) => Promise<void> = async (x) =>
  new Promise((resolve) => {
    setTimeout(resolve, x);
  });
