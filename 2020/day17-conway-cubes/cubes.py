#!/usr/bin/env python

from itertools import product as cartesianProduct


def main() -> None:
    with open('day17.in') as f:
        active_cubes = parseInput([line.strip() for line in f.readlines()])
    active_cubes_3d = growDimensions(active_cubes, n=3)
    active_cubes_4d = growDimensions(active_cubes, n=4)

    print(f"Part 1: {countActiveCubes(active_cubes_3d, n=3)}")
    print(f"Part 2: {countActiveCubes(active_cubes_4d, n=4)}")


def parseInput(lines: list) -> set:
    n = len(lines)
    # store the co-ordinates of all the active cubes
    return set((i, j) for j in range(n) for i in range(n)
               if isActive(lines[i][j]))


def isActive(cube: str) -> bool:
    return cube == '#'


def growDimensions(active_cubes: set, n: int = 3) -> set:
    # grow each active cube co-ordinates tuple to nD by adding n - 2 0's
    return set((i, j, *([0] * (n - 2))) for i, j in active_cubes)


def countActiveCubes(active_cubes: set, n: int = 3, cycles: int = 6) -> int:
    for i in range(cycles):
        active_cubes = changeState(active_cubes, n)
    return len(active_cubes)


def changeState(active_cubes: set, n: int = 3) -> set:
    neighbours = getAllNeighbours(active_cubes, n)
    new_active = set(cube for cube in neighbours if
                     activationRequired(cube, active_cubes))
    return new_active


def getAllNeighbours(active_cubes: set, n: int) -> set:
    bounds = [(min(index), max(index)) for i in range(n)
              if (index := [cube[i] for cube in active_cubes])]

    # generate co-ordinates for all neighbours of *all* cubes
    return set(cartesianProduct(*[range(i[0]-1, i[1]+2) for index in range(n)
                                  if (i := bounds[index])]))


def activationRequired(cube: tuple, active_cubes: set) -> bool:
    active_neighbours = countActiveNeighbours(cube, active_cubes)
    if cube in active_cubes:
        return active_neighbours in [2, 3]
    else:
        return active_neighbours == 3


def countActiveNeighbours(cube: tuple, active_cubes: set) -> int:
    # active neighbour co-ordinates for a single given cube
    neighbours = cartesianProduct(*[range(i-1, i+2) for i in cube])
    return sum([neighbour in active_cubes and neighbour != cube
                for neighbour in neighbours])


if __name__ == '__main__':
    main()
