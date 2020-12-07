#!/usr/bin/env python

def readInput() -> list:
    with open('day02.in') as f:
        return list(map(int, f.read().strip().split(',')))


def simulate(inA: int = 12, inB: int = 2) -> int:
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


def nounVerb() -> int:
    program = readInput()
    noun, verb = findInputs(program, target=19690720)
    return 100 * noun + verb


def findInputs(program: list, target: int) -> (int, int):
    for a in range(100):
        lo, hi = 0, 99
        while lo <= hi:
            b = lo + (hi - lo) // 2
            res = simulate(a, b)
            if res == target:
                return (a, b)
            elif res < target:
                lo = b + 1
            else:
                hi = b - 1
    return (0, 0)


if __name__ == '__main__':
    print(f"Part 1 = {simulate()}")
    print(f"Part 2 = {nounVerb()}")
