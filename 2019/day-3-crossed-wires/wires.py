#!/usr/bin/env python

def minDist(wires: list) -> int:
    cross = getIntersections(wires)
    return min([abs(x[0]) + abs(x[1]) for x in cross])


def getIntersections(wires: list) -> set:
    path1 = getPoints(wires[0])
    path2 = getPoints(wires[1])
    return path1.intersection(path2)


def getPoints(wire: list) -> list:
    points = set()
    x, y = 0, 0

    for move in wire:
        dist = int(move[1:])
        for _ in range(dist):
            direction = move[0]
            if direction in 'RL':
                x += 1 if direction == 'R' else -1
            elif direction in 'UD':
                y += 1 if direction == 'U' else -1
            points.add((x, y))

    return points


def stepsToClosestIntersection(wires: list) -> int:
    cross = getIntersections(wires)
    dists = [(findDist(wires[0], point) + findDist(wires[1], point))
             for point in cross]
    return min(dists)


def findDist(wire: list, point: (int, int)) -> int:
    x, y = 0, 0
    cross_x, cross_y = point
    total = 0

    for move in wire:
        dist = int(move[1:])
        for _ in range(dist):
            direction = move[0]

            if direction in 'RL':
                x += 1 if direction == 'R' else -1
            elif direction in 'UD':
                y += 1 if direction == 'U' else -1

            total += 1

            if x == cross_x and y == cross_y:
                return total

    return total


if __name__ == '__main__':
    with open('day3.in') as f:
        wires = [line.strip().split(',') for line in f.readlines()]

    print(f"Part 1 = {minDist(wires)}")
    print(f"Part 2 = {stepsToClosestIntersection(wires)}")
