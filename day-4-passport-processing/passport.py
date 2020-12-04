#!/usr/bin/env python
import re


def countValid(passports: list, strict: bool = False) -> int:
    return sum([int(isValid(p, strict)) for p in passports])


def isValid(passport: dict, strict: bool = False) -> bool:
    for key in ('byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'):
        if (key not in passport) or \
                (strict and not checkValues(key, passport[key])):
            return False
    return True


def checkValues(key: str, val: str) -> bool:
    if key == 'byr':
        return 1920 <= int(val) <= 2002
    if key == 'iyr':
        return 2010 <= int(val) <= 2020
    if key == 'eyr':
        return 2020 <= int(val) <= 2030
    if key == 'hgt':
        try:
            num, unit = int(val[:-2]), val[-2:]
            return (unit == 'cm' and 150 <= num <= 193) or \
                (unit == 'in' and 59 <= num <= 76)
        except:
            return False
    if key == 'hcl':
        # a # followed by exactly six characters 0-9 or a-f
        return re.match('^#[\da-f]{6}$', val) is not None
    if key == 'ecl':
        return val in ('amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth')
    if key == 'pid':
        # a nine-digit number, including leading zeroes
        return re.match('^\d{9}$', val) is not None


if __name__ == '__main__':
    with open('day4.in') as f:
        lines = ''.join(f.readlines())
    passports = lines.split('\n\n')

    for i, p in enumerate(passports):
        pairs = [each.split(':') for each in p.split()]
        passports[i] = {k: v for k, v in pairs}

    print(f'Part 1  = {countValid(passports)}')
    print(f'Part 2 = {countValid(passports, strict=True)}')
