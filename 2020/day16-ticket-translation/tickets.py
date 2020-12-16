#!/usr/bin/env python

import re
from collections import defaultdict
from math import prod
from typing import List


def parseNotes(lines: List[str]) -> defaultdict:
    notes = defaultdict(list)
    fields = re.compile('^(.*): (\d+-\d+) or (\d+-\d+)$')
    ticket_type = 'your ticket'
    for line in lines:
        match = fields.match(line)
        if not line:
            continue
        elif match:
            field, *ranges = match.groups()
            p = re.compile('^(\d+)-(\d+)$')
            notes[field] = [list(map(int, p.match(r).groups())) for r in ranges]
        elif 'nearby' in line:
            ticket_type = 'nearby tickets'
        elif 'your' not in line:
            notes[ticket_type].append(list(map(int, line.split(','))))
    return notes


def getScanErrorRate(notes: defaultdict) -> int:
    return sum([value for n in notes['nearby tickets']
                for value in n if isInvalid(notes, value=value)])


def isInvalid(notes: defaultdict, value: int, field: str = None) -> bool:

    def isValidValue(ranges: List[int], value: int) -> bool:
        return any([start <= value <= finish for start, finish in ranges])

    if field:
        if isValidValue(notes[field], value):
            return False
    else:
        checkFields = [field for field in notes
                       if field not in ['your ticket', 'nearby tickets']]
        if any([isValidValue(notes[field], value) for field in checkFields]):
            return False

    return True


def getFieldProd(notes: defaultdict, keyword: str) -> int:
    valid_tickets = [t for t in notes['nearby tickets']
                     if all([not isInvalid(notes, value=v) for v in t])]
    valid_tickets.extend(notes['your ticket'])

    # group all ticket values by position
    field_groups = [list(i) for i in zip(*valid_tickets)]
    taken_fields = []
    field_types = [''] * len(notes['your ticket'][0])

    # get a list of field type options for every position
    possible_fields = sorted([(i, getPossibleField(field_values, notes))
                              for i, field_values in enumerate(field_groups)],
                             key=lambda x: len(x[1]))

    # narrow down possibilities starting with position with fewest options
    for i, possible in possible_fields:
        for t in taken_fields:
            possible.remove(t)
        f_type = possible[0]
        taken_fields.append(f_type)
        field_types[i] = f_type

    keyword_indices = [i for i, f_type in enumerate(field_types)
                       if keyword in f_type]

    return prod([notes['your ticket'][0][i] for i in keyword_indices])


def getPossibleField(field_values: List[int],
                     notes: defaultdict) -> List[str]:
    checkFields = [field for field in notes
                   if field not in ['your ticket', 'nearby tickets']]
    possible = [field for field in checkFields
                if not any([isInvalid(notes, value=value, field=field)
                            for value in field_values])]
    return possible


if __name__ == '__main__':
    with open('day16.in') as f:
        notes = parseNotes([line.strip() for line in f.readlines()])

    print(f"Part 1: {getScanErrorRate(notes)}")
    print(f"Part 2: {getFieldProd(notes, keyword='departure')}")
