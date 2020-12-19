#!/usr/bin/env python

import re
from typing import List


def main() -> None:
    with open('day18.in') as file:
        expressions = [line.strip() for line in file]

    print(f"Part 1: {getSum(expressions)}")
    print(f"Part 2: {getSum(expressions, add_before_multiply=True)}")


def getSum(expressions: List[str], add_before_multiply: bool = False) -> int:
    return sum(evaluate(exp, add_before_multiply) for exp in expressions)


def evaluate(expression: str, add_before_multiply: bool) -> int:
    # change all integers to custom integers which use overriden operators
    expression = re.sub(r'(\d+)', r'CustomInteger(\1)', expression)

    # part 1: change all + with / signs (operators overriden by CustomInteger)
    expression = re.sub('[+]', '/', expression)

    # part 2: change all * to - (operators overriden by CustomInteger)
    if add_before_multiply:
        expression = re.sub('[*]', '-', expression)

    return eval(expression).value


class CustomInteger:
    def __init__(self, value):
        self.value = value

    # part 1: / will add with left->right precedence like * (multplication)
    def __truediv__(self, other):
        return self.__add__(other)

    # part 2: - will multiply with lower precedence than / (addition)
    def __sub__(self, other):
        return self.__mul__(other)

    def __add__(self, other):
        return CustomInteger(self.value + other.value)

    def __mul__(self, other):
        return CustomInteger(self.value * other.value)


if __name__ == '__main__':
    main()
