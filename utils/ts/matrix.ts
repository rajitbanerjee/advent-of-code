import * as _ from "lodash";

export const transpose2DMatrix = (m: any[][]) => m[0].map((_, i) => m.map((x) => x[i]));

export const createMatrix = (fill: any, rows: number, cols?: number): any[][] =>
  [...Array(rows)].map((_) => Array(cols ?? rows).fill(fill));

export const matrixToString = (m: any[][]): string => m.map((row) => row.join("")).join("\n");

export const matrixToDict = (m: any[][]): { [key: string]: any } => {
  const dict: { [key: string]: any } = {};
  m.forEach((row, i) => {
    row.forEach((c, j) => {
      dict[i + "," + j] = c;
    });
  });
  return dict;
};

export const dictToMatrix = (d: { [key: string]: any }): any[][] => {
  const rows = _.max(_.keys(d).map((k) => +k.split(",")[0])) + 1;
  const cols = _.max(_.keys(d).map((k) => +k.split(",")[1])) + 1;
  const matrix: any[][] = createMatrix(0, rows, cols);
  for (const [k, v] of _.entries(d)) {
    const [i, j] = k.split(",").map(Number);
    matrix[i][j] = v;
  }
  return matrix;
};
