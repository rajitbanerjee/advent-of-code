#!/usr/bin/env python
from collections import Counter


def getCount(group: str, everyone: bool = False) -> int:
    if not everyone:
        # part 1
        return len(set(group.replace('\n', '')))
    else:
        # part 2
        num_people = len(group.split('\n'))
        return sum([Counter(group)[q] == num_people for q in set(group)])


def getSum(groups: list, everyone: bool = False) -> int:
    return sum([getCount(g, everyone) for g in groups])


if __name__ == '__main__':
    with open('day6.in') as f:
        groups = ''.join(f.readlines()).split('\n\n')

    print(f'Part 1 = {getSum(groups)}')
    print(f'Part 2 = {getSum(groups, everyone=True)}')
