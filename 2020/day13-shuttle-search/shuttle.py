#!/usr/bin/env python

from math import ceil
from numpy import prod
from typing import List


def getTotalWaiting(first_timestamp: int, bus_ids: List[int]) -> int:
    # smallest multiple of each bus ID after first timestamp (inclusive)
    earliest = [(ceil(first_timestamp/i) * i, i) for i in bus_ids if i != 0]
    best = min(earliest, key=lambda x: x[0])
    return (best[0] - first_timestamp) * best[1]


def getEarliestTimestamp(first_timestamp: int, bus_ids: List[int]) -> int:
    divisors = [bus for bus in bus_ids if bus != 0]
    remainders = [bus - i for i, bus in enumerate(bus_ids) if bus != 0]
    return chineseRemainder(divisors, remainders)


def chineseRemainder(n: List[int], a: List[int]) -> int:
    # https://en.wikipedia.org/wiki/Chinese_remainder_theorem#Existence_(direct_construction)
    # x congruent to a_i (mod n_i) for all i
    # => x congruent to y (mod N) for solution y, and N = product of all n_i
    x = 0
    N = prod(n)
    for i in range(len(n)):
        N_i = N/n[i]
        M_i = modInverse(int(N_i), n[i])
        x += a[i] * M_i * N_i
    return int(x % N)


def modInverse(a: int, m: int) -> int:
    a = a % m
    # brute force: modular multiplicative inverse
    for x in range(1, m):
        if (a * x) % m == 1:
            return x
    return 1


if __name__ == '__main__':
    with open('day13.in') as f:
        lines = f.readlines()
        first_timestamp = int(lines[0])
        bus_ids = list(map(int, lines[1].strip().replace('x', '0').split(',')))

    print(f"Part 1 = {getTotalWaiting(first_timestamp, bus_ids)}")
    print(f"Part 2 = {getEarliestTimestamp(first_timestamp, bus_ids)}")
