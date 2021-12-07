export const transpose2DMatrix = (m: any[][]) => m[0].map((_, i) => m.map((x) => x[i]));
export const createNumberMatrix = (size: number) => [...Array(size)].map((_) => Array(size).fill(0));
