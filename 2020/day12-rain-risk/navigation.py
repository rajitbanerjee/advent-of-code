#!/usr/bin/env python

from math import sin, cos, radians


def get_manhattan_from_start(instructions: list,
                             waypoint: (int, int) = None) -> int:
    if not waypoint:
        x, y = follow(instructions)
    else:
        x, y = follow_waypoint(instructions, waypoint)
    return abs(x) + abs(y)


def follow(instructions: list) -> (int, int):
    compass = 'NESW'
    x, y, d = 0, 0, compass.index('E')

    for direction, units in instructions:
        if direction in compass:
            x, y = move(direction, x, y, units)
        elif direction == 'F':
            x, y = move(compass[d], x, y, units)
        else:
            sign = +1 if direction == 'R' else -1
            d = (d + sign * units // 90) % 4

    return (x, y)


def move(direction: str, x: int, y: int, units: int) -> (int, int):
    sign = +1 if direction in 'NE' else -1
    if direction in 'WE':
        x += sign * units
    else:
        y += sign * units
    return (x, y)


def follow_waypoint(instructions: list, waypoint: (int, int)) -> (int, int):
    x, y, w = 0, 0, complex(*waypoint)

    for direction, units in instructions:
        if direction in 'NESW':
            w = move_waypoint(w, direction, units)
        elif direction == 'F':
            x, y = move_ship_to_waypoint(x, y, w, units)
        else:
            w = rotate_waypoint(w, direction, units)

    return (x, y)


def move_waypoint(w: complex, direction: str, units: int) -> complex:
    return complex(*move(direction, w.real, w.imag, units))


def move_ship_to_waypoint(x: int, y: int,
                          w: complex, value: int) -> (int, int):
    return (int(x + w.real * value), int(y + w.imag * value))


def rotate_waypoint(w: complex, direction: str, degrees: int) -> complex:
    # complex numbers are rotated counter-clockwise by default
    sign = -1 if direction == 'R' else +1
    rad = radians(sign * degrees)
    return w * complex(int(cos(rad)), int(sin(rad)))


if __name__ == '__main__':
    with open('day12.in') as f:
        instructions = [(i[0], int(i[1:])) for i in f.readlines()]

    print(f"Part 1 = {get_manhattan_from_start(instructions)}")
    print(f"Part 2 = {get_manhattan_from_start(instructions, waypoint=(10, 1))}")
