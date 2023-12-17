#!/usr/bin/env ts-node
import { splitAllLinesAsNumberBy } from "@utils";
import * as _ from "lodash";

enum Code {
    ADD = 1,
    MULTIPLY = 2,
    HALT = 99,
}

const getFirstPosition = (program: number[], noun: number, verb: number): number => {
    restoreGravityAssist(program, noun, verb);
    run(program);
    return program[0];
};

const restoreGravityAssist = (program: number[], noun: number, verb: number) => {
    program[1] = noun;
    program[2] = verb;
};

const run = (program: number[]) => {
    const op = (code: Code) => (code === Code.ADD ? _.add : _.multiply);
    for (let i = 0; ; i += 4) {
        let [code, in1, in2, out] = program.slice(i, i + 4);
        if (code === Code.HALT) break;
        program[out] = op(code)(program[in1], program[in2]);
    }
};

const getNounVerb = (program: number[], target: number): number => {
    const [noun, verb] = search(program, target);
    return 100 * noun + verb;
};

const search = (program: number[], target: number, size = 99): [number, number] => {
    const mid = (min: number, max: number): number => min + Math.floor((max - min) / 2);
    let [output, noun, verb] = [0, 0, 0];
    let [minNoun, maxNoun] = [0, size];

    while (minNoun <= maxNoun) {
        noun = mid(minNoun, maxNoun);
        let [minVerb, maxVerb] = [0, size];

        while (minVerb <= maxVerb) {
            verb = mid(minVerb, maxVerb);
            output = getFirstPosition(_.cloneDeep(program), noun, verb);

            if (output === target) return [noun, verb];
            else if (output < target) minVerb = verb + 1;
            else maxVerb = verb - 1;
        }

        if (output < target) minNoun = noun + 1;
        else maxNoun = noun - 1;
    }
    return [-1, -1];
};

if (require.main === module) {
    const program: number[] = splitAllLinesAsNumberBy("day02.in", ",")[0];
    const [a, b] = ["Part 1", "Part 2"];
    console.time(a);
    console.timeLog(a, getFirstPosition(_.cloneDeep(program), 12, 2));
    console.time(b);
    console.timeLog(b, getNounVerb(program, 19690720));
}
