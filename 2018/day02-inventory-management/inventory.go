package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strings"
)

func main() {
	boxes := parseInput("day2.in")
	fmt.Printf("Part 1: %d\n", getChecksum(boxes))
	fmt.Printf("Part 2: %s\n", getCommonCharacters(boxes))
}

func parseInput(filename string) []string {
	file, err := os.Open(filename)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	var lines []string
	sc := bufio.NewScanner(file)
	for sc.Scan() {
		lines = append(lines, sc.Text())
	}
	return lines
}

func getChecksum(boxes []string) int {
	twos, threes := 0, 0
	for _, box := range boxes {
		hasExactlyTwo, hasExactlyThree := countTwosAndThrees(box)
		twos += hasExactlyTwo
		threes += hasExactlyThree
	}
	return twos * threes
}

func countTwosAndThrees(box string) (int, int) {
	freq := make(map[rune]int)
	for _, letter := range box {
		freq[letter] += 1
	}

	var hasExactlyTwo, hasExactlyThree int
	for _, count := range freq {
		if count == 2 {
			hasExactlyTwo = 1
		}
		if count == 3 {
			hasExactlyThree = 1
		}
	}
	return hasExactlyTwo, hasExactlyThree
}

func getCommonCharacters(boxes []string) string {
	box1, box2 := getCorrectBoxes(boxes)
	var common strings.Builder
	for i := 0; i < len(boxes[0]); i++ {
		if box1[i] == box2[i] {
			common.WriteString(string(box1[i]))
		}
	}
	return common.String()

}

func getCorrectBoxes(boxes []string) (string, string) {
	for i := 0; i < len(boxes)-1; i++ {
		for j := i + 1; j < len(boxes); j++ {
			if getDifference(boxes[i], boxes[j]) == 1 {
				return boxes[i], boxes[j]
			}
		}
	}
	panic("No two boxes with IDs differing by 1 character.")
}

func getDifference(box1, box2 string) int {
	var diff int
	for i := 0; i < len(box1); i++ {
		if box1[i] != box2[i] {
			diff++
		}
	}
	return diff
}
