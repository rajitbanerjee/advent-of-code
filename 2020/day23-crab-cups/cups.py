#!/usr/bin/env python

from typing import List, Tuple


def main() -> None:
    with open('day23.in') as f:
        cups = list(map(int, list(f.read().strip())))

    print(f"Part 1: {playGame(cups[:])}")
    cups.extend(i for i in range(max(cups) + 1, 10**6 + 1))
    print(f"Part 2: {playGame(cups[:], n_moves=10**7)}")


def playGame(cups: List[int], n_moves: int = 100) -> str:
    curr = cups[0]
    for _ in range(n_moves):
        cups, curr = move(cups, curr)
    if n_moves <= 100:
        return getOrder(cups)
    else:
        one = cups.index(1)
        n = len(cups)
        print(cups[(one + 1) % n], cups[(one + 2) % n])
        return ""


def move(cups: List[int], curr: int) -> Tuple[List[int], int]:
    dest = curr - 1
    picked_cups = pickThree((cups.index(curr) + 1) % len(cups), cups)
    curr = cups[(cups.index(curr) + 1) % len(cups)]

    while True:
        if dest != 0 and dest not in picked_cups:
            break
        dest = (dest - 1) % (max(cups) + 1)

    new_cups = cups[:]
    for cup in picked_cups[::-1]:
        new_cups.insert(new_cups.index(dest) + 1, cup)

    return new_cups, curr


def pickThree(index: int, cups: List[int]) -> List[int]:
    picked = []
    for _ in range(3):
        picked.append(cups.pop(index))
        index %= len(cups)
    return picked


def getOrder(cups: List[int]) -> str:
    n, one = len(cups), cups.index(1)
    return ''.join(str(cups[(i+1) % n]) for i in range(one, one+n-1))


if __name__ == '__main__':
    main()
