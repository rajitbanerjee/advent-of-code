#!/usr/bin/env python

def count(mat: list, right: int = 3, down: int = 1) -> int:
    count = 0
    x, y = down, right
    
    while (x < len(mat)):
        count += int(mat[x][y] == '#')
        x += down
        y = (y + right) % len(mat[0])

    return count


if __name__ == '__main__':
    with open('day3.in') as f:
        mat = [list(row.strip()) for row in f.readlines()]

    # part 1
    print(count(mat))

    # part 2
    prod = 1
    for r, d in [(1, 1), (3, 1), (5, 1), (7, 1), (1, 2)]:
        prod *= count(mat, r, d)
    print(prod)
