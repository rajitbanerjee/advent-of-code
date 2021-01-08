package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
)

func main() {
	instructions := parseInput("day1.in")
	floorNum, basementChar := getFloor(instructions)
	fmt.Println("Part 1:", floorNum)
	fmt.Println("Part 2:", basementChar)
}

func parseInput(filename string) string {
	file, err := os.Open(filename)
	if err != nil {
		log.Fatal(err)
	}
	var instructions string
	sc := bufio.NewScanner(file)
	for sc.Scan() {
		instructions = sc.Text()
	}
	return instructions
}

func getFloor(instructions string) (int, int) {
	var floorNum, basementChar int
	var found bool
	for i, char := range instructions {
		// Part 1
		if char == '(' {
			floorNum++
		} else {
			floorNum--
		}
		// Part 2
		if !found && floorNum == -1 {
			basementChar = i
			found = true
		}
	}
	return floorNum, basementChar + 1
}
