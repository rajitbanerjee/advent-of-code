#!/usr/bin/env ts-node
import { bin2dec, flipBits, splitAllLinesBy } from "@utils";
import * as _ from "lodash";

const main = () => {
    const report: string[][] = splitAllLinesBy("day03.in", "");
    console.log(`Part 1: ${getPowerConsumption(report)}`);
    console.log(`Part 2: ${getLifeSupportRating(report)}`);
};

const getPowerConsumption = (report: string[][]): number => {
    const mostFrequent = report[0].map((_, i) => getBitAtIndex(report, i)).join("");
    const gamma = bin2dec(mostFrequent);
    const epsilon = bin2dec(flipBits(mostFrequent));
    return gamma * epsilon;
};

const getBitAtIndex = (report: string[][], index: number, freqMode = "most"): number => {
    const bitSum = _.sumBy(report, (line) => +line[index]);
    const majority = bitSum >= report.length / 2;
    return +(freqMode === "most" ? majority : !majority);
};

const getLifeSupportRating = (report: string[][]): number => {
    const oxygen = getRating(report, "most");
    const co2 = getRating(report, "least");
    return oxygen * co2;
};

const getRating = (report: string[][], freqMode: string): number => {
    let bit = 0;
    while (report.length > 1) {
        report = report.filter((digits) => +digits[bit] === getBitAtIndex(report, bit, freqMode));
        bit++;
    }
    return bin2dec(report[0].join(""));
};

if (require.main === module) main();
