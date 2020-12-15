#!/usr/bin/env python

from typing import List


def getSpoken(start: List[int], target: int) -> int:
    n = len(start)
    last, lastSeen = start[-1], {start[i]: i + 1 for i in range(n)}
    for i in range(n, target):
        lastSeen[last], last = i, i - lastSeen.get(last, i)
    return last


if __name__ == '__main__':
    with open('day15.in') as f:
        start = list(map(int, f.read().split(',')))

    print(f"Part 1 = {getSpoken(start, target=2020)}")
    # brute force completes in a few seconds!
    print(f"Part 2 = {getSpoken(start, target=30000000)}")
