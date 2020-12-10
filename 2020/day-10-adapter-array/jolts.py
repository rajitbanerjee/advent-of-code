#!/usr/bin/env python

def getNums(ratings: list) -> list:
    nums = sorted(ratings)
    return [0] + nums + [nums[-1] + 3]


def getDiffProd(ratings: list) -> int:
    count = {1: 0, 3: 0}
    nums = getNums(ratings)
    for i in range(len(nums) - 1):
        count[nums[i+1] - nums[i]] += 1
    return count[1] * count[3]


def countWays(ratings: list) -> int:
    nums = getNums(ratings)
    n = len(nums)
    dp = [0] * n
    dp[0] = 1

    for i in range(n):
        for j in range(1, 4):
            # next adapter to be chosen is at most 3 jolts higher
            if i + j < n and nums[i + j] <= nums[i] + 3:
                dp[i + j] += dp[i]

    return dp[-1]


if __name__ == '__main__':
    with open('day10.in') as f:
        ratings = list(map(int, f.readlines()))

    print(f"Part 1 = {getDiffProd(ratings)}")
    print(f"Part 2 = {countWays(ratings)}")
