#!/usr/bin/env ts-node
import { readAllLines } from "@utils";
import * as _ from "lodash";

type Axis = { min: number; max: number };

type Step = {
    turn: Turn;
    cuboid: Cuboid;
};

enum Turn {
    OFF,
    ON,
}

class Cuboid {
    x: Axis;
    y: Axis;
    z: Axis;

    constructor(x: Axis, y: Axis, z: Axis) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    axes(): Axis[] {
        return [this.x, this.y, this.z];
    }

    countCubes() {
        const dimension = (a: Axis) => Math.abs(a.max - a.min) + 1;
        return dimension(this.x) * dimension(this.y) * dimension(this.z);
    }

    overlap(cuboid: Cuboid): Cuboid {
        const noIntersection = (a: Axis, b: Axis): boolean => {
            return a.min > b.max || b.min > a.max;
        };
        const getAxisOverlap = (a: Axis, b: Axis): Axis => {
            return { min: _.max([a.min, b.min]), max: _.min([a.max, b.max]) };
        };
        const axes: Axis[] = [];
        for (const [a, b] of _.zip(this.axes(), cuboid.axes())) {
            if (noIntersection(a, b)) return null;
            axes.push(getAxisOverlap(a, b));
        }
        return new Cuboid(axes[0], axes[1], axes[2]);
    }
}

const main = () => {
    const steps: Step[] = readAllLines("day22.in", "\n").map((l) => {
        const parts = l.split(" ");
        const turn = parts[0] === "on" ? Turn.ON : Turn.OFF;
        const matches = parts[1].match(/-?\d+/g).map(Number);
        const cuboid = new Cuboid({ min: matches[0], max: matches[1] }, { min: matches[2], max: matches[3] }, { min: matches[4], max: matches[5] });
        return { turn, cuboid };
    });

    const [a, b] = ["Part 1", "Part 2"];
    console.time(a);
    console.timeLog(a, countCubes(steps, [-50, 50]));
    console.time(b);
    console.timeLog(b, countCubes(steps));
};

const countCubes = (steps: Step[], range?: [number, number]): number => {
    const isInRange = (axis: Axis) => range[0] <= axis.min && axis.max <= range[1];
    const allInRange = (axes: Axis[]) => _.every(axes, (axis) => isInRange(axis));
    steps = handleOverlaps(range ? steps.filter(({ cuboid }) => allInRange(cuboid.axes())) : steps);
    return _.sumBy(steps, ({ turn, cuboid }) => (turn === Turn.ON ? 1 : -1) * cuboid.countCubes());
};

const handleOverlaps = (steps: Step[]): Step[] => {
    const updatedSteps: Step[] = [];
    for (const { turn, cuboid } of steps) {
        const overlapSteps: Step[] = [];
        for (const { turn: turn2, cuboid: cuboid2 } of updatedSteps) {
            const overlapCuboid = cuboid.overlap(cuboid2);
            if (overlapCuboid !== null) {
                overlapSteps.push({ turn: turn2 === Turn.OFF ? Turn.ON : Turn.OFF, cuboid: overlapCuboid });
            }
        }
        if (turn === Turn.ON) updatedSteps.push({ turn, cuboid });
        updatedSteps.push(...overlapSteps);
    }
    return updatedSteps;
};

if (require.main === module) main();
