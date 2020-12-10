#!/usr/bin/env python
from copy import deepcopy


def findVal(prog: list) -> (int, bool):
    i, val = 0, 0
    seen = set()
    while i < len(prog):
        op, arg = prog[i][0], int(prog[i][1])
        if i not in seen:
            seen.add(i)
            if op == 'nop':
                i += 1
            elif op == 'acc':
                i += 1
                val += arg
            elif op == 'jmp':
                i += arg
        else:
            # True, for "loop exists"
            return (val, True)
    # no loop
    return (val, False)


def valAtTheEnd(prog: list) -> int:
    i = 0
    val, loop = findVal(prog)
    # try changing 'nop' and 'jmp' ops until the program terminates
    while loop:
        copy = deepcopy(prog)
        op, arg = prog[i][0], int(prog[i][1])
        if op == 'nop' and arg != 0:
            copy[i][0] = 'jmp'
        elif op == 'jmp':
            copy[i][0] = 'nop'
        val, loop = findVal(copy)
        i += 1
    return val


if __name__ == '__main__':
    with open('day8.in') as f:
        prog = [op.strip().split() for op in f.readlines()]

    print(f"Part 1 = {findVal(prog)}")
    print(f"Part 2 = {valAtTheEnd(prog)}")
