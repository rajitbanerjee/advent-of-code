#!/usr/bin/env python

def threeSum(nums: list) -> str:
    for n in nums:
        for m in nums:
            p = 2020 - (n + m)
            if p in nums:
                return (f'{n} * {m} * {p} = {n*m*p}')


with open('day1.in') as f:
    nums = [int(n) for n in f.readlines()]
print(threeSum(nums))
