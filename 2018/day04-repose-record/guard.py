#!/usr/bin/env python

from collections import defaultdict
from datetime import datetime
from typing import List, Tuple


def main() -> None:
    with open('day4.in') as f:
        lines = sorted(f.readlines(), key=lambda x:
                       datetime.strptime(x[1:17], '%Y-%m-%d %H:%M'))
    sleepRecords = parseInput(lines)
    print(f"Part 1: {applyFirstStrategy(sleepRecords)}")
    print(f"Part 2: {applySecondStrategy(sleepRecords)}")


def parseInput(lines: List[str]) -> dict:
    records, guardID, startMin, endMin = {}, 0, 0, 0
    for line in lines:
        if "Guard" in line:
            guardID = int(line[line.index('#')+1: line.index('b')-1])
            if guardID not in records:
                records[guardID] = defaultdict(list)
        elif "falls" in line:
            startMin = int(line[15:17])
        else:
            endMin = int(line[15:17])
            date = datetime.strptime(line[1:11], '%Y-%m-%d')
            records[guardID][date].append((startMin, endMin))
    return records


def applyFirstStrategy(records: dict) -> int:
    guardID = max(records,
                  key=lambda x: sum(end-start for _, v in records[x].items()
                                    for start, end in v))

    return guardID * getMaxMinute(records, guardID)


def getMaxMinute(records: dict, guardID: int) -> int:
    freq, numIntervals = getMinuteFreqs(records, guardID)
    return max(freq, key=lambda x: freq[x]/numIntervals)


def getMinuteFreqs(records: dict, guardID: int) -> Tuple[dict, int]:
    numIntervals, freq = 0, defaultdict(int)
    for intervals in records[guardID].values():
        if intervals:
            for start, end in intervals:
                numIntervals += 1
                for i in range(start, end):
                    freq[i] += 1
    return (freq, numIntervals)


def applySecondStrategy(records: dict) -> int:
    guardID = max(records, key=lambda x: getMaxMinuteFreq(records, x))
    return guardID * getMaxMinute(records, guardID)


def getMaxMinuteFreq(records: dict, guardID: int) -> int:
    freq, _ = getMinuteFreqs(records, guardID)
    return max(freq.values()) if freq else 0


if __name__ == '__main__':
    main()
