#!/usr/bin/env python

from copy import deepcopy


def simulate(layout: list, tolerance: int = 4,
             only_first: bool = False) -> int:
    identical = False
    while not identical:
        layout, identical = update(layout, tolerance, only_first)
    return countOccupied(layout)


def update(layout: list, tolerance: int,
           only_first: bool = False) -> (list, bool):
    rows, cols = len(layout), len(layout[0])
    new_layout, identical = deepcopy(layout), True

    for i in range(rows):
        for j in range(cols):
            if layout[i][j] == 'L' and \
                    countOccupiedAround(i, j, layout, only_first) == 0:
                new_layout[i][j], identical = '#', False
            elif layout[i][j] == '#' and \
                    countOccupiedAround(i, j, layout, only_first) >= tolerance:
                new_layout[i][j], identical = 'L', False

    return (new_layout, identical)


def countOccupiedAround(i: int, j: int, layout: list,
                        only_first: bool = False) -> int:
    if not only_first:
        # problem part 1
        around = [(i-1, j-1), (i-1, j), (i-1, j+1), (i, j-1), (i, j+1),
                  (i+1, j-1), (i+1, j), (i+1, j+1)]
    else:
        # problem part 2
        around = getFirstEachDir(i, j, layout)
    return sum([isOccupied(a, b, layout) for a, b in around])


def getFirstEachDir(i: int, j: int, layout: list) -> list:
    around = []
    directions = [(0, 1), (0, -1), (-1, 0), (1, 0),
                  (-1, -1), (-1, 1), (1, -1), (1, 1)]

    for dx, dy in directions:
        x, y = i + dx, j + dy
        # keep moving in current direction until seat is found
        while isValid(x, y, layout) and layout[x][y] == '.':
            x += dx
            y += dy
        around.append((x, y))

    return around


def isValid(i: int, j: int, layout: list) -> bool:
    rows, cols = len(layout), len(layout[0])
    return 0 <= i < rows and 0 <= j < cols


def isOccupied(i: int, j: int, layout: list) -> bool:
    return isValid(i, j, layout) and layout[i][j] == '#'


def countOccupied(layout: list) -> int:
    rows, cols = len(layout), len(layout[0])
    return sum([isOccupied(i, j, layout)
                for j in range(cols) for i in range(rows)])


if __name__ == '__main__':
    with open('day11.in') as f:
        layout = [list(line.strip()) for line in f.readlines()]

    print(f"Part 1 = {simulate(deepcopy(layout))}")
    print(f"Part 2 = {simulate(deepcopy(layout), tolerance=5, only_first=True)}")
