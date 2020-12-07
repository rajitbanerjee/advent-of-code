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
                col = each[first_space + 1:last_space]
                num = int(each[:first_space])
                inner[col] = num
        bags[outer] = inner
    return bags


def countShiny(bags: dict) -> int:
    return sum([int(containsShiny(col, bags)) for col in bags])


def containsShiny(col: str, bags: dict) -> bool:
    for each in bags[col]:
        if each == 'shiny gold' or containsShiny(each, bags):
            return True
    return False


def countBagsInShiny(bags: dict) -> int:

    def getSum(bag: dict) -> int:
        # go deep into a bag and count inner bags
        return sum([v + v * count(bags[k]) for k, v in bag.items()])

    def count(bag: dict) -> int:
        # count is 0 if no more bags are found, else continue recursion
        return 0 if not bag else getSum(bag)

    return getSum(bags['shiny gold'])


if __name__ == '__main__':
    with open('day7.in') as f:
        bags = parseBags(f.readlines())

    print(f'Part 1 = {countShiny(bags)}')
    print(f'Part 2 = {countBagsInShiny(bags)}')
