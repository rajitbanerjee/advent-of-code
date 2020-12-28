#!/usr/bin/env python

from typing import List


def main() -> None:
    with open("day1.in") as f:
        freqChanges = list(map(int, f.readlines()))

    print(f"Part 1: {getSumFrequencies(freqChanges)}")
    print(f"Part 2: {getFirstDuplicate(freqChanges)}")


def getSumFrequencies(freqChanges: List[int]) -> int:
    return sum(freqChanges)


def getFirstDuplicate(freqChanges: List[int]) -> int:
    total, seen, i = 0, set(), 0
    while True:
        total += freqChanges[i]
        if total in seen:
            return total
        seen.add(total)
        i = (i + 1) % len(freqChanges)


if __name__ == '__main__':
    main()
