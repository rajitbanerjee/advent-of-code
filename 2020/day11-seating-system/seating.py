#!/usr/bin/env python

from copy import deepcopy


def isOccupied(i: int, j: int, layout: list) -> int:
    if isValid(i, j, layout):
        if layout[i][j] == '#':
            return 1
    return 0


def isValid(i: int, j: int, layout: list) -> bool:
    rows, cols = len(layout), len(layout[0])
    return 0 <= i < rows and 0 <= j < cols


def countOccupiedAround(i: int, j: int, layout: list,
                        only_first: bool = False) -> int:
    if only_first:
        around = getFirstEachDir(i, j, layout)
    else:
        around = [(i-1, j-1), (i-1, j), (i-1, j+1), (i, j-1), (i, j+1),
                  (i+1, j-1), (i+1, j), (i+1, j+1)]
    return sum([isOccupied(a, b, layout) for a, b in around])


def getFirstEachDir(i: int, j: int, layout: list) -> list:
    around = []
    # right
    x, y = i, j+1
    while isValid(x, y, layout) and layout[x][y] == '.':
        y += 1
    around.append((x, y))

    # left
    x, y = i, j-1
    while isValid(x, y, layout) and layout[x][y] == '.':
        y -= 1
    around.append((x, y))

    # top
    x, y = i-1, j
    while isValid(x, y, layout) and layout[x][y] == '.':
        x -= 1
    around.append((x, y))

    # bottom
    x, y = i+1, j
    while isValid(x, y, layout) and layout[x][y] == '.':
        x += 1
    around.append((x, y))

    # top left diagonal
    x, y = i-1, j-1
    while isValid(x, y, layout) and layout[x][y] == '.':
        x -= 1
        y -= 1
    around.append((x, y))

    # top right diagonal
    x, y = i-1, j+1
    while isValid(x, y, layout) and layout[x][y] == '.':
        x -= 1
        y += 1
    around.append((x, y))

    # bottom left diagonal
    x, y = i+1, j-1
    while isValid(x, y, layout) and layout[x][y] == '.':
        x += 1
        y -= 1
    around.append((x, y))

    # bottom right diagonal
    x, y = i+1, j+1
    while isValid(x, y, layout) and layout[x][y] == '.':
        x += 1
        y += 1
    around.append((x, y))

    return around


def update(layout: list, tol: int = 4, only_first: bool = False) -> list:
    new_layout = deepcopy(layout)
    for i in range(len(layout)):
        for j in range(len(layout[0])):
            if layout[i][j] == 'L' and \
                    countOccupiedAround(i, j, layout, only_first) == 0:
                new_layout[i][j] = '#'
            elif layout[i][j] == '#' and \
                    countOccupiedAround(i, j, layout, only_first) >= tol:
                new_layout[i][j] = 'L'
    return new_layout


def isIdentical(a: list, b: list) -> bool:
    for i in range(len(a)):
        for j in range(len(a[0])):
            if a[i][j] != b[i][j]:
                return False
    return True


def countOccupied(layout: list) -> int:
    rows, cols = len(layout), len(layout[0])
    around = [(i, j) for j in range(cols) for i in range(rows)]
    return sum([isOccupied(a, b, layout) for a, b in around])


def simulate(layout: list, tol: int, only_first: bool = False) -> list:
    while True:
        new_layout = update(layout, tol, only_first)
        if isIdentical(new_layout, layout):
            return countOccupied(new_layout)
        layout[:] = new_layout


if __name__ == '__main__':
    with open('day11.in') as f:
        layout = [list(line.strip()) for line in f.readlines()]

    print(f"Part 1 = {simulate(deepcopy(layout), tol=4)}")
    print(f"Part 2 = {simulate(deepcopy(layout), tol=5, only_first=True)}")
