package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
)

func main() {
	freqChanges := parseInput("day1.in")
	fmt.Printf("Part 1: %d\n", getSumFrequencies(freqChanges))
	fmt.Printf("Part 2: %d\n", getFirstDuplicate(freqChanges))
}

func parseInput(filename string) []int {
	file, err := os.Open(filename)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	var nums []int
	sc := bufio.NewScanner(file)
	for sc.Scan() {
		num, err := strconv.Atoi(sc.Text())
		if err != nil {
			log.Fatal(err)
		}
		nums = append(nums, num)
	}
	return nums
}

func getSumFrequencies(freqChanges []int) int {
	sum := 0
	for _, change := range freqChanges {
		sum += change
	}
	return sum
}

func getFirstDuplicate(freqChanges []int) int {
	sum, seen := 0, make(map[int]bool)
	for i := 0; ; i = (i + 1) % len(freqChanges) {
		sum += freqChanges[i]
		if seen[sum] {
			return sum
		}
		seen[sum] = true
	}
}
