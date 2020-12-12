#!/usr/bin/env python

import cmath
from math import sin, cos, radians


def get_manhattan_from_start(instructions: list,
                             waypoint: (int, int) = None) -> int:
    if not waypoint:
        x, y = follow(instructions)
    else:
        wx, wy = waypoint
        x, y = follow_waypoint(instructions, complex(wx, wy))
    return abs(x) + abs(y)


def follow(instructions: list) -> (int, int):
    compass = 'NESW'
    x, y, d = 0, 0, compass.index('E')

    for i in instructions:
        direction, units = i[0], int(i[1:])
        if direction in compass:
            x, y = move(direction, x, y, units)
        elif direction == 'F':
            x, y = move(compass[d], x, y, units)
        else:
            sign = +1 if direction == 'R' else -1
            d = (d + sign * units // 90) % 4

    return (x, y)


def move(direction: str, x: int, y: int, units: int) -> (int, int):
    if direction == 'N':
        y += units
    elif direction == 'E':
        x += units
    elif direction == 'S':
        y -= units
    elif direction == 'W':
        x -= units
    return (x, y)


def follow_waypoint(instructions: list, w: complex) -> (int, int):
    x, y = 0, 0
    for i in instructions:
        direction, units = i[0], int(i[1:])
        if direction in 'NESW':
            wx, wy = move(direction, w.real, w.imag, units)
            w = complex(wx, wy)
        elif direction == 'F':
            x, y = move_to_waypoint(x, y, w, units)
        else:
            # complex numbers are rotated counter-clockwise by default
            sign = +1 if direction == 'L' else -1
            rad = radians(sign * units)
            w *= complex(int(cos(rad)), int(sin(rad)))
    return (x, y)


def move_to_waypoint(x: int, y: int, w: complex, value: int) -> (int, int):
    return (int(x + w.real * value), int(y + w.imag * value))


if __name__ == '__main__':
    with open('day12.in') as f:
        instructions = [i.strip() for i in f.readlines()]

    print(f"Part 1 = {get_manhattan_from_start(instructions)}")
    print(f"Part 2 = {get_manhattan_from_start(instructions, waypoint=(10, 1))}")
