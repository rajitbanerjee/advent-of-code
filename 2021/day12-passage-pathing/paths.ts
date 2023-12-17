#!/usr/bin/env ts-node
import { defaultdict, isLowerCase, splitAllLinesBy } from "@utils";
import * as _ from "lodash";

const edgeMap: { [edge: string]: string[] } = defaultdict([]);
const possiblePaths: Set<string> = new Set<string>();
const countPaths = (cave: string, path: string[], allowRevisit = false): number => {
    if (cave === "end") {
        possiblePaths.add(path.join(","));
    } else {
        edgeMap[cave]
            .filter((c) => c !== "start")
            .filter((c) => {
                const smallCaves = path.filter(isLowerCase);
                const isRevisitComplete = new Set(smallCaves).size !== smallCaves.length;
                return (
                    !smallCaves.includes(c) || // Big cave, or unvisited small cave
                    (allowRevisit && !isRevisitComplete) // Part 2: A single small cave can be visited twice
                );
            })
            .forEach((c) => countPaths(c, _.concat(path, c), allowRevisit));
    }
    return possiblePaths.size;
};

if (require.main === module) {
    const edges: string[][] = splitAllLinesBy("day12.in", "-");
    edges.forEach(([a, b]) => {
        edgeMap[a].push(b);
        edgeMap[b].push(a);
    });

    const [a, b] = ["Part 1", "Part 2"];
    console.time(a);
    console.timeLog(a, countPaths("start", ["start"]));
    console.time(b);
    console.timeLog(b, countPaths("start", ["start"], true));
}
