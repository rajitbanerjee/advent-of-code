export const transpose2DMatrix = (m: any[][]) => m[0].map((_, i) => m.map((x) => x[i]));
export const createMatrix = (fill: any, rows: number, cols?: number): any[][] =>
  [...Array(rows)].map((_) => Array(cols ?? rows).fill(fill));
export const matrixToString = (m: any[][]): string => m.map((row) => row.join("")).join("\n");
