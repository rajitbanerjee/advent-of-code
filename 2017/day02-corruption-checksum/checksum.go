package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

func main() {
	rows := parseInput("day2.in")
	fmt.Println("Part 1:", findChecksum(rows))
	fmt.Println("Part 2:", evenDivSum(rows))
}

func parseInput(filename string) [][]int {
	file, err := os.Open(filename)
	if err != nil {
		log.Fatal(err)
	}

	var rows [][]int
	sc := bufio.NewScanner(file)
	for sc.Scan() {
		line := sc.Text()
		parts := strings.Fields(line)

		var row []int
		for _, p := range parts {
			num, _ := strconv.Atoi(p)
			row = append(row, num)
		}
		rows = append(rows, row)
	}
	return rows
}

// Part 1
func findChecksum(rows [][]int) int {
	sum := 0
	for _, row := range rows {
		min, max := getMinMax(row...)
		sum += max - min
	}
	return sum
}

func getMinMax(arr ...int) (int, int) {
	min, max := arr[0], arr[0]
	for _, a := range arr {
		if a < min {
			min = a
		}
		if a > max {
			max = a
		}
	}
	return min, max
}

// Part 2
func evenDivSum(rows [][]int) int {
	sum := 0
	for _, row := range rows {
		sum += getEvenDivRes(row)
	}
	return sum
}

func getEvenDivRes(row []int) int {
	for i := 0; i < len(row)-1; i++ {
		for j := i + 1; j < len(row); j++ {
			min, max := getMinMax(row[i], row[j])
			if max%min == 0 {
				return max / min
			}
		}
	}
	return 0
}
