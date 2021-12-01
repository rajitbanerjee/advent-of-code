#!/usr/bin/env python3
from typing import List


def main() -> None:
    with open('day01.in') as f:
        nums = [int(line.strip()) for line in f]

    print(f"Part 1: {countIncreases(nums)}")
    print(f"Part 2: {countIncreasesWindow(nums, 3)}")


def countIncreases(nums: List[int]) -> int:
    return sum(i > 0 and nums[i] > nums[i - 1] for i in range(len(nums)))


def countIncreasesWindow(nums: List[int], size: int) -> int:
    totals = [sum(nums[:size])]
    for i in range(size, len(nums)):
        totals.append(totals[i - size] + nums[i] - nums[i - size])
    return countIncreases(totals)


if __name__ == '__main__':
    main()
