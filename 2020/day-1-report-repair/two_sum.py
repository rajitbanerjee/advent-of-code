#!/usr/bin/env python

with open('day1.in') as f:
    nums = [int(n) for n in f.readlines()]

seen = {}
for n in nums:
    if 2020 - n not in seen:
        seen[n] = 2020 - n
    else:
        print(f'{n} * {2020 - n} = {n*(2020-n)}')
