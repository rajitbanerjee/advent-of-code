#!/usr/bin/env python
from collections import Counter


def isValid1(lo: int, hi: int, char: str, pwd: str) -> bool:
    return lo <= Counter(pwd)[char] <= hi


def isValid2(p1: int, p2: int, char: str, pwd: str) -> bool:
    return (pwd[p1 - 1] == char) ^ (pwd[p2 - 1] == char)


def countValid(passwords: str) -> int:
    count1 = count2 = 0
    for p in passwords:
        lo = int(p[:p.index('-')])
        hi = int(p[p.index('-') + 1: p.index(' ')])
        char = p[p.index(' ') + 1: p.index(':')]
        pwd = p[p.index(':') + 2:]
        count1 += int(isValid1(lo, hi, char, pwd))
        count2 += int(isValid2(lo, hi, char, pwd))
    return (count1, count2)


if __name__ == '__main__':
    with open('input.txt') as f:
        passwords = [each.strip() for each in f.readlines()]

    print(countValid(passwords))
