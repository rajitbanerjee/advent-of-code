#!/usr/bin/env python

import re
from typing import List, Tuple


def main() -> None:
    with open("day3.in") as f:
        claims = parseInput(f.readlines())

    countOverlapping, nonOverlappingID = fillFabric(claims)
    print(f"Part 1: {countOverlapping}")
    print(f"Part 2: {nonOverlappingID}")


# Parse lines into list of claims (where each claim is a dict)
def parseInput(lines: List[str]) -> List[dict]:
    pattern = r"^#(?P<id>\d+) @ (?P<leftInches>\d+)," + \
        r"(?P<topInches>\d+): (?P<width>\d+)x(?P<height>\d+)$"
    return [{k: int(v) for k, v in (m.groupdict()).items()}
            for line in lines if (m := re.match(pattern, line))]


# Cover parts of the fabric with all the given claims
# Return overlapping square inches, and the only non-overlapping claim ID
def fillFabric(claims: List[dict]) -> Tuple[int, int]:
    width, height = computeFabricDimensions(claims)
    fabric = [[0 for _ in range(width)] for _ in range(height)]
    countOverlapping = 0
    ids = set()

    for claim in claims:
        overlapping = False
        for i in range(claim["topInches"], getHeight(claim)):
            for j in range(claim["leftInches"], getWidth(claim)):
                if not fabric[i][j]:
                    fabric[i][j] = claim["id"]
                else:
                    overlapping = True
                    if fabric[i][j] != -1:  # X
                        countOverlapping += 1
                        if fabric[i][j] in ids:
                            ids.remove(fabric[i][j])
                        fabric[i][j] = -1

        if not overlapping:
            ids.add(claim["id"])

    # Only 1 non-overlapping ID is expected
    nonOverlappingID = next(iter(ids))
    return (countOverlapping, nonOverlappingID)


# Fabric must be large enough for the farthest claim (from top left)
def computeFabricDimensions(claims: List[dict]) -> Tuple[int, int]:
    return (getWidth(max(claims, key=lambda x: getWidth(x))),
            getHeight(max(claims, key=lambda x: getHeight(x))))


def getWidth(claim: dict) -> int:
    return claim["leftInches"] + claim["width"]


def getHeight(claim: dict) -> int:
    return claim["topInches"] + claim["height"]


if __name__ == '__main__':
    main()
