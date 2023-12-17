#!/usr/bin/env ts-node
import { defaultdict, NumberDict, readAllLines, StringDict } from "@utils";
import * as _ from "lodash";

type PolymerCounter = { elements: NumberDict; pairs: NumberDict };

const quantityRange = (template: string, rules: StringDict, steps: number): number => {
    const freq: PolymerCounter = makeCounter(template);
    polymerize(rules, freq, steps);
    const quantities = Object.values(freq["elements"]);
    return _.max(quantities) - _.min(quantities);
};

const makeCounter = (template: string): PolymerCounter => {
    const freq: PolymerCounter = { elements: defaultdict(0), pairs: defaultdict(0) };
    template.split("").forEach((e, i) => {
        freq["elements"][e]++;
        if (i) freq["pairs"][template[i - 1] + e]++;
    });
    return freq;
};

const polymerize = (rules: StringDict, freq: PolymerCounter, steps: number): void => {
    while (steps--) {
        for (const [pair, count] of Object.entries(freq["pairs"])) {
            const toInsert = rules[pair];
            freq["pairs"][pair] -= count;
            freq["pairs"][pair[0] + toInsert] += count;
            freq["pairs"][toInsert + pair[1]] += count;
            freq["elements"][toInsert] += count;
        }
    }
};

if (require.main === module) {
    const [template, rString] = readAllLines("day14.in", "\n\n");
    const rules: StringDict = _.fromPairs(rString.split("\n").map((l) => l.split(" -> ")));

    const [a, b] = ["Part 1", "Part 2"];
    console.time(a);
    console.timeLog(a, quantityRange(template, rules, 10));
    console.time(b);
    console.timeLog(b, quantityRange(template, rules, 40));
}
