#!/usr/bin/env ts-node
import { median, splitAllLinesBy } from "@utils";

const main = () => {
    const subsystem: string[][] = splitAllLinesBy("day10.in", "");
    const incompleteLines: string[][] = [];
    const [a, b] = ["Part 1", "Part 2"];
    console.time(a);
    console.timeLog(a, totalFirstErrorScores(subsystem, incompleteLines));
    console.time(b);
    console.timeLog(b, middleScore(incompleteLines));
};

// Part 1
const totalFirstErrorScores = (subsystem: string[][], incompleteLines: string[][]): number => {
    let total = 0;
    const scoreMap = { "*": 0, ")": 3, "]": 57, "}": 1197, ">": 25137 };
    subsystem.forEach((line) => {
        const firstIllegalScore = scoreMap[firstIllegalChar(line)];
        if (firstIllegalScore === 0) incompleteLines.push(line);
        total += firstIllegalScore;
    });
    return total;
};

const firstIllegalChar = (line: string[]): string => {
    const stack: string[] = [];
    const correctMatching = { ")": "(", "]": "[", "}": "{", ">": "<" };
    for (const char of line) {
        if ("([{<".includes(char)) stack.push(char);
        else if (correctMatching[char] !== stack.pop()) return char;
    }
    return "*";
};

// Part 2
const middleScore = (incompleteLines: string[][]): number => median(incompleteLines.map(autocomplete).map(completeScore));

const completeScore = (completion: string[]): number => {
    let total = 0;
    const scoreMap = { ")": 1, "]": 2, "}": 3, ">": 4 };
    completion.forEach((c) => (total = total * 5 + scoreMap[c]));
    return total;
};

const autocomplete = (line: string[]): string[] => {
    const stack: string[] = [];
    const correctMatching = { "(": ")", "[": "]", "{": "}", "<": ">" };
    for (const char of line) {
        if ("([{<".includes(char)) stack.push(char);
        else stack.pop();
    }
    return stack.map((c) => correctMatching[c]).reverse();
};

if (require.main === module) main();
