#!/usr/bin/env python


def getRow(seq: str) -> int:
    return partition(seq[:7], hi=127)


def getCol(seq: str) -> int:
    return partition(seq[7:], hi=7)


def getID(seq: str) -> int:
    return getRow(seq) * 8 + getCol(seq)


def partition(seq: str, lo: int = 0, hi: int = 127) -> int:
    while seq:
        mid = lo + (hi - lo) // 2
        if seq[0] in 'FL':
            hi = mid
        else:
            lo = mid + 1
        seq = seq[1:]
    return lo


def findMissing(all_seat_ID: list) -> int:
    first_seat = min(all_seat_ID)
    tot = sum([id - first_seat for id in all_seat_ID])
    n = len(all_seat_ID)
    return n * (n + 1) // 2 - tot + first_seat


if __name__ == '__main__':
    with open('day5.in') as f:
        all_seat_ID = [getID(seq.strip()) for seq in f.readlines()]

    print(f'Part 1 = {max(all_seat_ID)}')
    print(f'Part 2 = {findMissing(all_seat_ID)}')
