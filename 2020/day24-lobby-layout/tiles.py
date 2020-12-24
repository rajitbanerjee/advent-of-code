#!/usr/bin/env python

import re
from collections import Counter
from typing import List


def main() -> None:
    with open('day24.in') as f:
        lines = [line.strip() for line in f]

    print(f"Part 1: {countBlackTiles(lines)}")
    print(f"Part 2: {countBlackTiles(lines, flip_adjacent=True, days=100)}")


def countBlackTiles(lines: List[str], flip_adjacent: bool = False,
                    days: int = True) -> int:
    directions = {'e': 1, 'w': -1, 'ne': 1j, 'sw': -1j,
                  'se': 1 - 1j, 'nw': -1 + 1j}

    flips = Counter()
    for moves in parseMoves(lines):
        tile = sum(directions[m] for m in moves)
        flips[tile] += 1

    blacks = set()
    for tile, count in flips.items():
        if count % 2 == 1:
            blacks.add(tile)

    if flip_adjacent:
        for _ in range(days):
            # get 6 adjacent tiles for each existsing black tile
            adjacents = Counter()
            for tile in blacks:
                for change_dir in directions.values():
                    adjacents[tile + change_dir] += 1

            # any black tile with 1 adjacent black tile remains black
            # any tile with 2 adjacent black tiles flips to black
            blacks = set(tile for tile, count in adjacents.items() if
                         tile in blacks and count == 1 or count == 2)

    return len(blacks)


def parseMoves(lines: List[str]) -> List[List[str]]:
    regex = re.compile('[ns]?[ew]')
    return [regex.findall(line) for line in lines]


if __name__ == '__main__':
    main()
