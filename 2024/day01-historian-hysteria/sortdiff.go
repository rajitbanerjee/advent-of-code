package main

import (
	"fmt"
	"math"
	"os"
	"sort"
	"strconv"
	"strings"
)

func main() {
	list1, list2 := parseInput("day01.in")
	// fmt.Printf("list1: %v, list2: %v\n", list1, list2)

	diff := partOne(list1, list2)
	fmt.Printf("1/ diff: %v\n", diff)

    similarity := partTwo(list1, list2)
	fmt.Printf("2/ similarity: %v\n", similarity)
}

func parseInput(filename string) ([]int, []int) {
	data, _ := os.ReadFile(filename)
	lines := strings.Split(strings.TrimSpace((string(data))), "\n")

	var list1, list2 []int
	for _, line := range lines {
		fields := strings.Fields(line)
		num1, _ := strconv.Atoi(fields[0])
		num2, _ := strconv.Atoi(fields[1])
		list1 = append(list1, num1)
		list2 = append(list2, num2)
	}
	return list1, list2
}

func partOne(list1 []int, list2 []int) int {
	sort.Ints(list1)
	sort.Ints(list2)

	sum := 0
	for i := range list1 {
		sum += int(math.Abs(float64(list1[i] - list2[i])))
	}
	return sum
}

func partTwo(list1 []int, list2 []int) int {
    freqMap := makeFreqMap(list2)
    sum := 0
    for _, v := range list1 {
        if _, ok := freqMap[v]; ok {
            sum += v * freqMap[v]
        }
    }
    return sum
}

func makeFreqMap(list []int) map[int]int {
    freqMap := make(map[int]int)
    for _, v := range list {
        freqMap[v]++
    }
    // fmt.Println(freqMap)
    return freqMap
}
