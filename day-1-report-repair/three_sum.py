#!/usr/bin/env python

def threeSum(nums: list) -> str:
    seen = {}
    for n in nums:
        for i in range(len(nums)):
            for j in range(i+1, len(nums)):
                if 2020 - (nums[i] + nums[j]) not in seen:
                    seen[n] = 2020 - (nums[i] + nums[j])
                else:
                    return (f'{n} * {nums[i]} * {nums[j]} = {n*nums[i]*nums[j]}')

with open('input.txt') as f:
    nums = [int(n) for n in f.readlines()]
print(threeSum(nums))
