#!/usr/bin/env python

import time


def main() -> None:
    start = time.perf_counter()
    with open('day5.in') as f:
        polymer = f.read().strip()
    print(f"Part 1: {len(triggerReaction(polymer))}")
    print(f"Part 2: {len(shortestPolymer(polymer))}")
    print(f"Time taken: {time.perf_counter()-start} sec")


def triggerReaction(polymer: str) -> str:
    units, i = list(polymer), 0
    while i < len(units)-2:
        if abs(ord(units[i])-ord(units[i+1])) == 32:
            units = units[:i] + units[i+2:]
            if i:
                i -= 1
        else:
            i += 1
    return ''.join(units)


def shortestPolymer(polymer: str) -> str:
    table = {}
    for ch in polymer:
        if ch not in table:
            copy = polymer[:]
            table[ch] = triggerReaction(copy.replace(ch.lower(), "").
                                        replace(ch.upper(), ""))
    return min(table.values(), key=len)


if __name__ == '__main__':
    main()
