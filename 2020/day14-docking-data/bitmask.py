#!/usr/bin/env python

from typing import Any, List, Optional, Sequence
from collections import defaultdict
import re


def getSumValues(program: List[str], decoder: str) -> int:
    mem = decode(program, decoder)
    return sum(mem.values())


def decode(program: List[str], decoder: str) -> defaultdict:
    mem = defaultdict(int)
    for line in program:
        if line.startswith('mask'):
            p = re.compile('^mask = ([X10]+)$')
            groups = parseLine(p, line)
            if groups:
                mask = groups[0]
        else:
            p = re.compile('^mem\[(\d+)\] = (\d+)$')
            groups = parseLine(p, line)
            if groups:
                address, value = map(int, groups)
                if decoder == 'value':
                    # part 1
                    new_value = int(applyMask(value, mask, change='01'), 2)
                    mem[address] = new_value
                elif decoder == 'address':
                    # part 2
                    for new_address in getAllAddresses(address, mask):
                        mem[new_address] = value
    return mem


def parseLine(p: re.Pattern, line: str) -> Optional[Sequence[Any]]:
    m = re.match(p, line)
    return m.groups() if m else None


def applyMask(x: int, mask: str, change: str) -> str:
    bits = list(bin(x).lstrip('0b').zfill(36))
    bits = [(m if m in change else b) for b, m in zip(bits, mask)]
    return ''.join(bits)


def getAllAddresses(address: int, mask: str) -> List[int]:
    new_addresses = []
    masked = applyMask(address, mask, change='1X')
    bits = list(masked)
    floating = bits.count('X')
    if floating == 0:
        new_addresses.append(int(masked, 2))
    else:
        # all possibilities to replace the floating bits
        options = [bin(i).lstrip('0b').zfill(floating)
                   for i in range(2**floating)]
        for op in options:
            a, y = bits[:], 0
            for x in range(len(a)):
                if a[x] == 'X':
                    a[x] = op[y]
                    y += 1
            new_addresses.append(int(''.join(a), 2))
    return new_addresses


if __name__ == '__main__':
    with open('day14.in') as f:
        program = [each.strip() for each in f.readlines()]

    print(f"Part 1 = {getSumValues(program, decoder='value')}")
    print(f"Part 2 = {getSumValues(program, decoder='address')}")
