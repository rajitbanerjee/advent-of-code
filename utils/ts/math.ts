export const sum = (nums: number[]) => nums.reduce((a, b) => a + b, 0);
export const vectorSum = (a: number[], b: number[]) => a.forEach((e, i) => (a[i] = e + b[i]));
export const triangularNum = (k: number) => (k * (k + 1)) / 2;
export const prod = (nums: number[]) => nums.reduce((a, b) => a * b, 1);

// Statistics
export const mean = (nums: number[]) => sum(nums) / nums.length;
export const median = (nums: number[]) => {
  const sorted: number[] = nums.slice().sort((a, b) => a - b);
  const middle: number = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) return (sorted[middle - 1] + sorted[middle]) / 2;
  return sorted[middle];
};
export const mode = (items: any[]) => {
  const counter = new Map<any, number>();
  items.forEach((n) => {
    if (!counter.has(n)) counter.set(n, 0);
    counter.set(n, counter.get(n) + 1);
  });
  let maxCount = 0;
  let maxItem = items[0];
  for (const [n, c] of counter.entries()) {
    if (c > maxCount) {
      maxCount = c;
      maxItem = n;
    }
  }
  console.log(counter);
  return maxItem;
};

// Binary
export const bin = (num: string) => parseInt(num, 2);
export const flipBits = (bits: string) =>
  bits
    .split("")
    .map((b) => (1 - +b).toString())
    .join("");
