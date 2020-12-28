package main

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
)

func main() {
	freqChanges := parseInput("day1.in")
	fmt.Printf("Part 1: %d\n", getSumFrequencies(freqChanges))
	fmt.Printf("Part 2: %d\n", getFirstDuplicate(freqChanges))

}

func parseInput(filename string) []string {
	bytes, _ := ioutil.ReadFile(filename)
	lines := strings.Split(string(bytes), "\n")
	return lines[:len(lines)-1]
}

func getSumFrequencies(freqChanges []string) int {
	sum := 0
	for _, change := range freqChanges {
		val, _ := strconv.Atoi(change)
		sum += val
	}
	return sum
}

func getFirstDuplicate(freqChanges []string) int {
	sum, seen := 0, make(map[int]bool)
	for i := 0; ; i = (i + 1) % len(freqChanges) {
		val, _ := strconv.Atoi(freqChanges[i])
		sum += val

		if _, duplicate := seen[sum]; duplicate {
			return sum
		}
		seen[sum] = true
	}
}
