export const truncate = (str: string, n: number, m: number) => {
  return str.length > n + m
    ? str.slice(0, n - 1) + "..." + str.slice(-(m + 1), -1)
    : str;
};
