#!/usr/bin/env python

def readInput() -> list:
    with open('day2.in') as f:
        return list(map(int, f.read().strip().split(',')))


def simulate(inA: int, inB: int) -> int:
    program = readInput()
    program[1], program[2] = inA, inB
    run(program)
    return program[0]


def run(program: list) -> list:
    for i in range(0, len(program), 4):
        if program[i] == 99:
            break
        elif program[i] == 1:
            program[program[i+3]] = program[program[i+1]] + \
                program[program[i+2]]
        elif program[i] == 2:
            program[program[i+3]] = program[program[i+1]] * \
                program[program[i+2]]
    return program


def nounVerb(target: int) -> int:
    program = readInput()
    noun, verb = findInputs(program, target)
    return 100 * noun + verb


def findInputs(program: list, target: int) -> (int, int):
    left, right = 0, 99
    # binary search for input A
    while left <= right:
        a = left + (right - left) // 2
        lo, hi = 0, 99
        # binary search for input B
        while lo <= hi:
            b = lo + (hi - lo) // 2
            res = simulate(a, b)
            if res == target:
                return (a, b)
            elif res < target:
                lo = b + 1
            else:
                hi = b - 1
        if res < target:
            left = a + 1
        else:
            right = a - 1
    return (0, 0)


if __name__ == '__main__':
    print(f"Part 1 = {simulate(inA=12, inB=2)}")
    print(f"Part 2 = {nounVerb(target=19690720)}")
