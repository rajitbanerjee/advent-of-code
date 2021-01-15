package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
)

func main() {
	sequence := readDigits("day1.in")
	fmt.Println("Part 1:", solveCaptcha(sequence, 1))
	fmt.Println("Part 2:", solveCaptcha(sequence, 2))
}

func readDigits(filename string) []int {
	file, err := os.Open(filename)
	if err != nil {
		log.Fatal(err)
	}

	var sequence []int
	var digits string

	sc := bufio.NewScanner(file)
	for sc.Scan() {
		digits = sc.Text()
	}
	for _, d := range digits {
		// '0' is ASCII 48; convert rune to int
		sequence = append(sequence, int(d)-48)
	}
	return sequence
}

func solveCaptcha(sequence []int, part int) int {
	sum, n, offset := 0, len(sequence), 1
	if part == 2 {
		offset = n / 2
	}
	for i, dig := range sequence {
		if dig == sequence[(i+offset)%n] {
			sum += dig
		}
	}
	return sum
}
