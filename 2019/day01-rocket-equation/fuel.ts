#!/usr/bin/env ts-node
import { readAllLinesAsNumbers } from "@utils";
import * as _ from "lodash";

const sumFuelRequirements = (modules: number[], added: boolean) => _.sum(modules.map(added ? getAddedFuel : getFuel));
const getFuel = (mass: number) => Math.floor(mass / 3) - 2;
const getAddedFuel = (mass: number) => {
  let total = 0;
  do {
    mass = getFuel(mass);
    total += mass > 0 ? mass : 0;
  } while (mass > 0);
  return total;
};

if (require.main === module) {
  const modules: number[] = readAllLinesAsNumbers("day01.in");
  const [a, b] = ["Part 1", "Part 2"];
  console.time(a);
  console.timeLog(a, sumFuelRequirements(modules, false));
  console.time(b);
  console.timeLog(b, sumFuelRequirements(modules, true));
}
