package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"sort"
	"strconv"
	"strings"
	"time"
)

func main() {
	lines := sortLines("day4.in")
	sleepRecords := parseInput(lines)
	fmt.Printf("Part 1: %d\n", applyFirstStrategy(sleepRecords))
	fmt.Printf("Part 2: %d\n", applySecondStrategy(sleepRecords))
}

// To store entries line by line from the file, and functions required to sort by date
type Lines []string

func (lines Lines) Len() int {
	return len(lines)
}

func (lines Lines) Swap(i, j int) {
	lines[i], lines[j] = lines[j], lines[i]
}

func (lines Lines) Less(i, j int) bool {
	return parseTime(lines[i], false).Before(parseTime(lines[j], false))
}

func parseTime(line string, onlyDate bool) time.Time {
	var year, month, day, hour, min int
	fmt.Sscanf(line[1:17], "%d-%d-%d %d:%d", &year, &month, &day, &hour, &min)
	if onlyDate {
		hour, min = 0, 0
	}
	return time.Date(year, time.Month(month), day, hour, min, 0, 0, time.UTC)
}

// Read input file and return lines sorted by date
func sortLines(filename string) Lines {
	file, err := os.Open(filename)
	if err != nil {
		log.Fatal(err)
	}
	var lines Lines
	sc := bufio.NewScanner(file)
	for sc.Scan() {
		lines = append(lines, sc.Text())
	}
	sort.Sort(lines)
	return lines
}

type Interval [2]int
type SleepRecords map[int](map[time.Time]([]Interval))

// Reorganise sorted lines of input file into suitable map indexed by guard ID
func parseInput(lines Lines) SleepRecords {
	records := SleepRecords(make(map[int]map[time.Time][]Interval))
	var guardID, startMin, endMin int
	for _, line := range lines {
		if fields := strings.Fields(line); fields[2] == "Guard" {
			guardID, _ = strconv.Atoi(fields[3][1:])
			if _, ok := records[guardID]; !ok {
				records[guardID] = make(map[time.Time]([]Interval))
			}
		} else if fields[2] == "falls" {
			startMin, _ = strconv.Atoi(fields[1][3:5])
		} else {
			endMin, _ = strconv.Atoi(fields[1][3:5])
			date := parseTime(line, true)
			records[guardID][date] = append(records[guardID][date], Interval{startMin, endMin})
		}
	}
	return records
}

// Part 1
func applyFirstStrategy(records SleepRecords) int {
	var guardID, maxSum int
	for id, dates := range records {
		sum := 0
		for _, intervals := range dates {
			for _, interval := range intervals {
				sum += interval[1] - interval[0]
			}
		}
		if sum > maxSum {
			maxSum = sum
			guardID = id
		}
	}
	return guardID * getMaxMinute(records, guardID)
}

// Get the minute that the guard with given ID spends asleep the most
func getMaxMinute(records SleepRecords, guardID int) int {
	freq, numIntervals := getMinuteFreqs(records, guardID)
	var max float32
	var maxMinute int
	for minute, count := range freq {
		if chance := float32(count) / float32(numIntervals); chance > max {
			max = chance
			maxMinute = minute
		}
	}
	return maxMinute
}

// For a given guard, get the map from minute -> # of days the guard is asleep for that minute
// Also return the number of intervals when the guard is alseep
func getMinuteFreqs(records SleepRecords, guardID int) (map[int]int, int) {
	numIntervals, freq := 0, make(map[int]int)
	for _, intervals := range records[guardID] {
		for _, interval := range intervals {
			numIntervals++
			for i := interval[0]; i < interval[1]; i++ {
				freq[i]++
			}
		}
	}
	return freq, numIntervals
}

// Part 2
func applySecondStrategy(records SleepRecords) int {
	var guardID, maxMinuteFreq int
	for id := range records {
		if minuteFreq := getMaxMinuteFreq(records, id); minuteFreq > maxMinuteFreq {
			maxMinuteFreq = minuteFreq
			guardID = id
		}
	}
	return guardID * getMaxMinute(records, guardID)
}

// Get the maximum number of days a given guard sleeps for any minute
func getMaxMinuteFreq(records SleepRecords, guardID int) int {
	freq, _ := getMinuteFreqs(records, guardID)
	max := 0
	for _, count := range freq {
		if count > max {
			max = count
		}
	}
	return max
}
