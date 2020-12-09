#!/usr/bin/env python

from itertools import combinations as c


def findFirstError(data: list, preamble: int) -> int:
    for i in range(preamble, len(data)):
        sums = [sum(each) for each in c(data[i - preamble: i], 2)]
        if data[i] not in sums:
            return data[i]
    return -1


def encryptionWeakness(data: list, target: int) -> int:
    curr_sum, n = data[0], len(data)
    left = 0

    # sliding window
    for right in range(1, n+1):
        while curr_sum > target and left < right-1:
            curr_sum -= data[left]
            left += 1
        if curr_sum == target:
            mini = min(data[left: right])
            maxi = max(data[left: right])
            return mini + maxi
        if right < n:
            curr_sum += data[right]
    return -1


if __name__ == '__main__':
    with open('day9.in') as f:
        data = list(map(int, f.readlines()))

    firstError = findFirstError(data, preamble=25)

    print(f"Part 1 = {firstError}")
    print(f"Part 2 = {encryptionWeakness(data, target=firstError)}")
