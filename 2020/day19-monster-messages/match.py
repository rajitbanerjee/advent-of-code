#!/usr/bin/env python

from typing import List, Tuple
import re


def main() -> None:
    with open('day19.in') as f:
        rules, messages = parseInput(f.readlines())

    print(f"Part 1: {countMatchingMessages(messages, rules)}")
    print(f"Part 2: {countMatchingMessages(messages, update(rules))}")


def parseInput(lines: List[str]) -> Tuple[dict, List[str]]:
    rules, messages = {}, []
    p = re.compile(r'^(\d+): (.*)$')

    for line in lines:
        m = p.match(line)
        if m:
            num, rule = m.groups()
            rules[num] = rule.strip('"')
        elif line != '\n':
            messages.append(line.strip())

    return (rules, messages)


def countMatchingMessages(messages: List[str], rules: dict,
                          num: str = '0') -> int:
    pattern = getRegex(rules, num)
    return sum(match(pattern, message) for message in messages)


def match(pattern: str, message: str) -> bool:
    return re.fullmatch(pattern, message) is not None


def getRegex(rules: dict, num: str, n: int = 0, limit_hack: int = 14) -> str:
    if n > limit_hack:
        return ''
    elif rules[num].isalpha():
        return rules[num]
    else:
        return f"({'|'.join(outer(rules, num, n))})"


def outer(rules: dict, num: str, n: int) -> list:
    return [inner(rules, nums, n) for nums in rules[num].split('|')]


def inner(rules: dict, nums: str, n: int) -> str:
    return ''.join([getRegex(rules, num, n+1) for num in nums.split()])


def update(rules: dict) -> dict:
    new_rules = {k: v for k, v in rules.items()}
    new_rules['8'] = '42 | 42 8'
    new_rules['11'] = '42 31 | 42 11 31'
    return new_rules


if __name__ == '__main__':
    main()
