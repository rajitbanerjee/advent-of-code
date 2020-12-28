#!/usr/bin/env python

from collections import Counter
from itertools import combinations
from typing import List, Tuple


def main() -> None:
    with open("day2.in") as f:
        boxes = [line.strip() for line in f]

    print(f"Part 1: {getChecksum(boxes)}")
    print(f"Part 2: {getCommonCharacters(boxes)}")


def getChecksum(boxes: List[str]) -> int:
    freqs = [Counter(box) for box in boxes]
    return countExactFreq(2, freqs) * countExactFreq(3, freqs)


def countExactFreq(val: int, freqs: List[Counter]) -> int:
    return sum(any(count == val for count in freq.values()) for freq in freqs)


def getCommonCharacters(boxes: List[str]) -> str:
    return ''.join([b1 for b1, b2 in zip(*getCorrectBoxes(boxes)) if b1 == b2])


def getCorrectBoxes(boxes: List[str]) -> Tuple[str, str]:
    for box1, box2 in combinations(boxes, 2):
        if getDifference(box1, box2) == 1:
            return (box1, box2)
    raise Exception("No two boxes with IDs differing by 1 character.")


def getDifference(box1: str, box2: str) -> int:
    return sum(b1 != b2 for b1, b2 in zip(box1, box2))


if __name__ == '__main__':
    main()
