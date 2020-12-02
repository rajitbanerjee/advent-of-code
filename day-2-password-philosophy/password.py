#!/usr/bin/env python
from collections import Counter


def isValid1(lo: int, hi: int, char: str, pwd: str) -> bool:
    return lo <= Counter(pwd)[char] <= hi


def isValid2(p1: int, p2: int, char: str, pwd: str) -> bool:
    return (pwd[p1 - 1] == char) ^ (pwd[p2 - 1] == char)


def countValid(passwords: list) -> int:
    count1 = count2 = 0
    for p in passwords:
        dash, space, colon = p.index('-'), p.index(' '), p.index(':')
        lo, hi = int(p[:dash]), int(p[dash + 1: space])
        char, pwd = p[space + 1: colon], p[colon + 2:]

        count1 += int(isValid1(lo, hi, char, pwd))
        count2 += int(isValid2(lo, hi, char, pwd))
    return (count1, count2)


if __name__ == '__main__':
    with open('input.txt') as f:
        passwords = [each.strip() for each in f.readlines()]

    print(countValid(passwords))
