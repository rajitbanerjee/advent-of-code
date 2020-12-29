package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strings"
)

type Box struct {
	id       string
	charFreq map[rune]int
}

func main() {
	boxes := parseInput("day2.in")
	fmt.Printf("Part 1: %d\n", getChecksum(boxes))

	box1, box2 := getCorrectBoxes(boxes)
	fmt.Printf("Part 2: %s\n", box1.commonCharacters(box2))
}

func parseInput(filename string) []Box {
	file, err := os.Open(filename)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	var boxes []Box
	sc := bufio.NewScanner(file)
	for sc.Scan() {
		line := sc.Text()
		boxes = append(boxes, Box{id: line, charFreq: countCharFreq(line)})
	}
	return boxes
}

func countCharFreq(id string) map[rune]int {
	charFreq := make(map[rune]int)
	for _, letter := range id {
		charFreq[letter] += 1
	}
	return charFreq
}

// Part 1
func getChecksum(boxes []Box) int {
	twos, threes := 0, 0
	for _, box := range boxes {
		hasExactlyTwo, hasExactlyThree := box.countTwosAndThrees()
		twos += hasExactlyTwo
		threes += hasExactlyThree
	}
	return twos * threes
}

func (box Box) countTwosAndThrees() (int, int) {
	var hasExactlyTwo, hasExactlyThree int
	for _, count := range box.charFreq {
		if count == 2 {
			hasExactlyTwo = 1
		}
		if count == 3 {
			hasExactlyThree = 1
		}
	}
	return hasExactlyTwo, hasExactlyThree
}

// Part 2
func getCorrectBoxes(boxes []Box) (Box, Box) {
	for i := 0; i < len(boxes)-1; i++ {
		for j := i + 1; j < len(boxes); j++ {
			if boxes[i].difference(boxes[j]) == 1 {
				return boxes[i], boxes[j]
			}
		}
	}
	panic("No two boxes with IDs differing by 1 character.")
}

func (box1 Box) difference(box2 Box) int {
	var diff int
	for i := 0; i < len(box1.id); i++ {
		if box1.id[i] != box2.id[i] {
			diff++
		}
	}
	return diff
}

func (box1 Box) commonCharacters(box2 Box) string {
	var common strings.Builder
	for i := 0; i < len(box1.id); i++ {
		if box1.id[i] == box2.id[i] {
			common.WriteString(string(box1.id[i]))
		}
	}
	return common.String()
}
