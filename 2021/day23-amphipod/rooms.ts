#!/usr/bin/env ts-node
import { vectorSum } from "@utils";

/*
#############
#...........#
###D#A#C#D###
  #B#C#B#A#
  #########
*/
let steps = [0, 0, 0, 0];

/*
#############
#.......D.A.#
###D#A#C#.###
  #B#C#B#.#
  #########
*/
vectorSum(steps, [3, 0, 0, 2]);

/*
#############
#.........A.#
###.#A#C#D###
  #B#C#B#D#
  #########
*/
vectorSum(steps, [0, 0, 0, 3 + 8]);

/*
#############
#.A.......A.#
###.#.#C#D###
  #B#C#B#D#
  #########
*/
vectorSum(steps, [4, 0, 0, 0]);

/*
#############
#.A.....C.A.#
###.#.#.#D###
  #B#C#B#D#
  #########
*/
vectorSum(steps, [0, 0, 2, 0]);

/*
#############
#.A.B...C.A.#
###.#.#.#D###
  #B#C#.#D#
  #########
*/
vectorSum(steps, [0, 5, 0, 0]);

/*
#############
#.A.B.....A.#
###.#.#C#D###
  #B#.#C#D#
  #########
*/
vectorSum(steps, [0, 0, 3 + 5, 0]);

/*
#############
#.A.......A.#
###.#B#C#D###
  #.#B#C#D#
  #########
*/
vectorSum(steps, [0, 3 + 5, 0, 0]);

/*
#############
#...........#
###A#B#C#D###
  #A#B#C#D#
  #########
*/
vectorSum(steps, [3 + 8, 0, 0, 0]);

const energy = steps[0] + steps[1] * 10 + steps[2] * 100 + steps[3] * 1000;
console.log("Part 1:", energy);
