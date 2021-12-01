#!/usr/bin/env python3

from typing import List


def main() -> None:
    with open('day01.in') as f:
        nums = [int(line.strip()) for line in f]

    print(f"Part 1: {countIncreases(nums)}")
    print(f"Part 2: {countIncreasesWindow(nums)}")


def countIncreases(nums: List[int]) -> int:
    return sum(i > 0 and nums[i] > nums[i-1] for i in range(len(nums)))


def countIncreasesWindow(nums: List[int], size: int = 3) -> int:
    left, right = 0, size - 1
    total = sum(nums[i] for i in range(left, right+1))
    window_totals = [total]

    for idx in range(right+1, len(nums)):
        total = total + nums[idx] - nums[idx - size]
        window_totals.append(total)

    return countIncreases(window_totals)


if __name__ == '__main__':
    main()
