#!/usr/bin/env python

from typing import List, Tuple


def main() -> None:
    with open('day21.in') as f:
        options, ingredients = getAllergenOptions([line.strip() for line in f])

    print(f"Part 1: {countNonAllergenic(options, ingredients)}")
    print(f"Part 2: {getDangerousIngredients(options)}")


def getAllergenOptions(lines: List[str]) -> Tuple[dict, List[str]]:
    options, ingredients = {}, []
    for line in lines:
        delim = line.index('(')
        curr_ingredients = line[:delim-1].split()
        ingredients.extend(curr_ingredients)
        allergens = line[delim+10:-1].split(', ')
        for a in allergens:
            allergenic = set(curr_ingredients)
            options[a] = allergenic if (a not in options) \
                else options[a] & allergenic
    return (options, ingredients)


def countNonAllergenic(options: dict, ingredients: List[str]) -> int:
    return sum(all(ing not in allergenic for allergenic in options.values())
               for ing in ingredients)


def getDangerousIngredients(options: dict) -> str:
    taken = {}
    while options:
        for allergen, ingredients in options.items():
            if len(ingredients) == 1:
                taken[allergen] = ingredients.pop()
        options = {allergen: ingredients - set(taken.values())
                   for allergen, ingredients in options.items()
                   if len(ingredients) > 1}
    dangerous = [ingredient for _, ingredient in sorted(taken.items())]
    return ','.join(dangerous)


if __name__ == '__main__':
    main()
