#!/usr/bin/env python


def parseBags(lines: list) -> dict:
    lines = [l.split(' contain ') for l in lines]
    bags = {}
    for line in lines:
        outer = line[0][:line[0].index('bags') - 1]
        inner = {}
        if 'no other' not in line[1]:
            for each in line[1].split(','):
                each = each.strip()
                first_space = each.index(' ')
                last_space = each.index(' bag')
                colour = each[first_space + 1:last_space]
                num = int(each[:first_space])
                inner[colour] = num
        bags[outer] = inner
    return bags


def countShiny(bags: dict) -> int:
    return sum([int(containsShiny(bags, colour)) for colour in bags])


def containsShiny(bags: dict, colour: str) -> bool:
    for each in bags[colour]:
        if each == 'shiny gold' or containsShiny(bags, each):
            return True
    return False


def countInside(bags: dict, colour: str) -> int:
    return sum([v + v * countInside(bags, k) for k, v in bags[colour].items()])


if __name__ == '__main__':
    with open('day7.in') as f:
        bags = parseBags(f.readlines())

    print(f"Part 1 = {countShiny(bags)}")
    print(f"Part 2 = {countInside(bags, 'shiny gold')}")
