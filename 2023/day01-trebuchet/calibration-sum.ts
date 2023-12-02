import { matchOverlap, readAllLines } from "@utils";
import * as _ from "lodash";

function extractDigits(line: string) {
  return line.match(/[0-9]/g);
}

function extractDigitsAndWordDigits(line: string) {
  return matchOverlap(line, /[0-9]|one|two|three|four|five|six|seven|eight|nine/g);
}

function wordToDigitMap(words: string[]) {
  const digitMap = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };
  return words.map((w) => (w in digitMap ? digitMap[w] : Number(w)));
}

function makeNumber(digits: string[]) {
  return Number(String(digits[0]) + String(digits[digits.length - 1]));
}

(() => {
  // part 1
  const lines1 = readAllLines("day01.in");
  console.log(_.sum(lines1.map(extractDigits).map(makeNumber)));

  // part 2
  const lines2 = readAllLines("day01.in");
  console.log(_.sum(lines2.map(extractDigitsAndWordDigits).map(wordToDigitMap).map(makeNumber)));
})();
