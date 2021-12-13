export const transpose2DMatrix = (m: any[][]) => m[0].map((_, i) => m.map((x) => x[i]));
export const createMatrix = (size: number, fill: any): any[][] => [...Array(size)].map((_) => Array(size).fill(fill));
export const matrixToString = (m: any[][]): string => m.map((row) => row.join("")).join("\n");
