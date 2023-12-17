import * as _ from "lodash";

export function transpose2DMatrix(m: any[][]) {
    return m[0].map((_, i) => m.map((x) => x[i]));
}

export function createMatrix(fill: any, rows: number, cols?: number): any[][] {
    return [...Array(rows)].map((_) => Array(cols ?? rows).fill(fill));
}

export function matrixToString(m: any[][]): string {
    return m.map((row) => row.join("")).join("\n");
}

export function matrixToDict(m: any[][]): { [key: string]: any } {
    const dict: { [key: string]: any } = {};
    m.forEach((row, i) => {
        row.forEach((c, j) => {
            dict[i + "," + j] = c;
        });
    });
    return dict;
}

export function dictToMatrix(d: { [key: string]: any }): any[][] {
    const rows = _.max(_.keys(d).map((k) => +k.split(",")[0])) + 1;
    const cols = _.max(_.keys(d).map((k) => +k.split(",")[1])) + 1;
    const matrix: any[][] = createMatrix(0, rows, cols);
    for (const [k, v] of _.entries(d)) {
        const [i, j] = k.split(",").map(Number);
        matrix[i][j] = v;
    }
    return matrix;
}
