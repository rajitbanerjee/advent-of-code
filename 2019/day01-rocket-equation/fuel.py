#!/usr/bin/env python


def getTotalFuel(masses: list) -> int:
    return sum([m//3 - 2 for m in masses])


def getMoreFuel(masses: list) -> int:
    return sum([getSum(m) for m in masses])


def getSum(mass: int) -> int:
    total = 0
    while True:
        mass = mass//3 - 2
        if mass <= 0:
            break
        total += mass
    return total


if __name__ == '__main__':
    with open('day01.in') as f:
        masses = [int(m.strip()) for m in f.readlines()]

    print(f"Part 1 = {getTotalFuel(masses)}")
    print(f"Part 2 = {getMoreFuel(masses)}")
