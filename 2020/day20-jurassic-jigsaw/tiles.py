#!/usr/bin/env python

from collections import defaultdict
from pprint import pprint
from typing import Generator, List
import numpy as np


def main() -> None:
    with open('day20-sample.in') as f:
        tiles = parseInput([line.strip() for line in f])
    commonBorders = getCommonBorders(tiles)
    categories = categoriseTiles(commonBorders)

    print(f"Part 1: {np.prod(categories['corners'])}")
    print(f"Part 2: {getRoughWaters(tiles, commonBorders, categories)}")


def parseInput(lines: List[str]) -> dict:
    tiles = {num: image for i in range(0, len(lines), 12)
             if (num := int(lines[i][5: 9]),
                 image := [list(row) for row in lines[i+1: i+11]])}
    return tiles


def getCommonBorders(tiles: dict) -> dict:
    common = defaultdict(list)
    for a in tiles:
        for b in tiles:
            if a != b and hasCommonBorder(tiles[a], tiles[b]):
                common[a].append(b)
    pprint(common)
    return common


def categoriseTiles(commonBorders: dict) -> dict:
    categories = defaultdict(list)
    options = ("corners", "borders", "inner")
    for tile, cb in commonBorders.items():
        categories[options[len(cb)-2]].append(tile)
    return categories


def hasCommonBorder(im1: List[str], im2: List[str]) -> bool:
    borders1, borders2 = getBorders(im1), getBorders(im2)
    return len(borders1.intersection(borders2)) != 0


def getBorders(image: List[str]) -> set:
    return set(''.join(img[0]) for img in flipAndRotate(image))


def flipAndRotate(image: List[str]) -> Generator:
    for axes in (0, 1, (0, 1)):
        image = np.flip(image, axes)
        for _ in range(4):
            yield image
            image = rotateClockwise(image)


def rotateClockwise(image: List[str]) -> np.ndarray:
    return np.rot90(image, k=1, axes=(1, 0))


def getRoughWaters(tiles: dict, commonBorders: dict, categories: dict) -> int:
    n = int(len(tiles)**0.5)
    id_grid = getIDGrid(n, tiles, commonBorders, categories)
    full_image = getFullImage(n, tiles, id_grid)
    compact_image = getCompactImage(n, full_image)
    pprint(compact_image)
    # TODO
    return 0


def getIDGrid(n: int, tiles: dict, commonBorders: dict,
              categories: dict) -> List[List[int]]:
    top_left = categories["corners"][1]
    taken = {top_left}
    id_grid = fillBorders(top_left, n, commonBorders, taken)
    id_grid = fillInner(id_grid, n, commonBorders, taken)
    pprint(id_grid)
    return id_grid


def fillBorders(top_left: int, n: int,
                commonBorders: dict, taken: set) -> List[List[int]]:
    id_grid = [[0 for _ in range(n)] for _ in range(n)]
    id_grid[0][0] = top_left

    for j in range(1, n):
        id_grid[0][j] = getNextTile(commonBorders, taken,
                                    tile=id_grid[0][j-1])
    for i in range(1, n):
        id_grid[i][0] = getNextTile(commonBorders, taken,
                                    tile=id_grid[i-1][0])
    for j in range(1, n):
        id_grid[n-1][j] = getNextTile(commonBorders, taken,
                                      tile=id_grid[n-1][j-1])
    for i in range(1, n-1):
        id_grid[i][n-1] = getNextTile(commonBorders, taken,
                                      tile=id_grid[i-1][n-1])
    return id_grid


def getNextTile(commonBorders: dict, taken: set, tile: int = None,
                id_grid: List[List[int]] = None,
                i: int = None, j: int = None) -> int:
    if tile:
        adjacent = sorted([c for c in commonBorders[tile]
                           if c not in taken],
                          key=lambda x: len(commonBorders[x]))
        print(tile, adjacent)
        taken.add(adjacent[0])
        return adjacent[0]
    elif id_grid and i and j:
        up = set(commonBorders[id_grid[i][j-1]])
        left = set(commonBorders[id_grid[i-1][j]])
        return next(iter(up.intersection(left).difference(taken)))
    return -1


def fillInner(id_grid: List[List[int]], n: int,
              commonBorders: dict, taken: set) -> List[List[int]]:
    for i in range(1, n-1):
        for j in range(1, n-1):
            id_grid[i][j] = getNextTile(commonBorders, taken,
                                        None, id_grid, i, j)
    return id_grid


def getFullImage(n: int, tiles: dict,
                 id_grid: List[List[int]]) -> List[List[str]]:
    return [[tiles[num] for num in row] for row in id_grid]


def getCompactImage(n: int, full_image: List[List[str]]) -> List[str]:
    im = [np.concatenate(row, axis=1) for row in full_image]
    return [''.join(row) for i in range(n) for row in im[i]]


def leftBorder(image: List[str]) -> str:
    return ''.join(row[0] for row in image)


def rightBorder(image: List[str]) -> str:
    return ''.join(row[-1] for row in image)


def topBorder(image: List[str]) -> str:
    return ''.join(image[0])


def bottomBorder(image: List[str]) -> str:
    return ''.join(image[-1])


if __name__ == '__main__':
    main()
