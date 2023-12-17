#!/usr/bin/env ts-node
import { readAllLines, chunks } from "@utils";
import * as _ from "lodash";

/*
Instructions:
-------------
                   [w, x, y, z]  
00:   inp w      : [w, 0, 0, z]
01:   mul x 0
02:   add x z    : [w, z, 0, z]
03:   mod x 26   : [w, z%26, 0, z]
04:   div z A    : [w, z%26, 0, z//A]
05:   add x B    : [w, z%26 + B, 0, z/A]
06:   eql x w
07:   eql x 0    : [w, (z%26 + B) != w), 0, z//A]
08:   mul y 0
09:   add y 25   : [w, (z%26 + B) != w, 25, z//A]
10:   mul y x    : [w, (z%26 + B) != w, 25 * x, z//A]
11:   add y 1    : [w, (z%26 + B) != w, 25 * x + 1, z//A]
12:   mul z y    : [w, (z%26 + B) != w, 25 * x + 1, (z//A) * (25 * x + 1)]
13:   mul y 
14:   add y w    : [w, (z%26 + B) != w, w, (z//A) * (25 * x + 1)]
15:   add y C    : [w, (z%26 + B) != w, w + C, (z//A) * (25 * x + 1)]
16:   mul y x    : [w, (z%26 + B) != w, (w + C) * x, (z//A) * (25 * x + 1)]
17:   add z y    : [w, (z%26 + B) != w, (w + C) * x, (z//A) * (25 * x + 1) + (w + C) * x]
---------------------------------------
x = (z%26 + B) != w 
z = (z//a) * (25 * x + 1) + (w + C) * x
*/

const NUM_DIGITS = 14;

const main = () => {
    // Divide the list of instructions into NUM_DIGITS chunks, then extract the variables A, B, C
    const variables: number[][] = chunks(readAllLines("day24.in").join("\n"), NUM_DIGITS).map((chunk) => {
        return [chunk[4], chunk[5], chunk[15]].map((s) => +s.split(" ")[2]);
    });

    const [a, b] = ["Part 1", "Part 2"];
    console.time(a);
    console.timeLog(a, findModelNumber(variables, "largest"));
    console.time(b);
    console.timeLog(b, findModelNumber(variables, "smallest"));
};

const findModelNumber = (variables: number[][], accept: "largest" | "smallest"): string => {
    const options = accept === "largest" ? _.range(9, 0, -1) : _.range(1, 10);
    return search(new Set<string>(), variables, 0, 0, options);
};

const search = (seen: Set<string>, variables: number[][], i: number, z: number, options: number[]): string => {
    if (i === variables.length) return z === 0 ? undefined : "";
    if (seen.has(str(z, i))) return "";

    const [A, B, C] = variables[i];
    for (const w of options) {
        const x = +((z % 26) + B !== w);
        const new_z = Math.floor(z / A) * (25 * x + 1) + (w + C) * x;
        const remainingDigits = search(seen, variables, i + 1, new_z, options);
        if (remainingDigits !== "") return [w, remainingDigits ?? ""].join("");
    }
    seen.add(str(z, i));
    return "";
};

const str = (...nums: number[]) => nums.join(",");

if (require.main === module) main();
