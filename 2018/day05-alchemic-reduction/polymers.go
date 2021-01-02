package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strings"
	"time"
)

func main() {
	start := time.Now()
	polymer := readPolymer("day5.in")
	fmt.Println("Part 1:", len(triggerReaction(polymer)))
	fmt.Println("Part 2:", len(shortestPolymer(polymer)))
	fmt.Println("Time taken:", time.Since(start).Seconds(), "sec")
}

func readPolymer(filename string) string {
	file, err := os.Open(filename)
	if err != nil {
		log.Fatal(err)
	}
	var polymer string
	sc := bufio.NewScanner(file)
	for sc.Scan() {
		polymer = sc.Text()
	}
	return polymer
}

// Part 1
func triggerReaction(polymer string) string {
	units := []rune(polymer)
	for i := 0; i < len(units)-1; {
		if sameTypeOppositePolarity(units[i], units[i+1]) {
			units = append(units[:i], units[i+2:]...)
			if i != 0 {
				i--
			}
		} else {
			i++
		}
	}
	return string(units)
}

// Same letter, different case e.g. ('a', 'A'), ('C', 'c')
func sameTypeOppositePolarity(char1, char2 int32) bool {
	return char1-char2 == 32 || char2-char1 == 32
}

// Part 2
func shortestPolymer(polymer string) string {
	minPolymer, table := polymer, make(map[string]string)
	for _, char := range polymer {
		ch := strings.ToLower(string(char))
		if _, ok := table[ch]; !ok {
			table[ch] = triggerReaction(removeAll(polymer, char))
			if len(table[ch]) < len(minPolymer) {
				minPolymer = table[ch]
			}
		}
	}
	return minPolymer
}

// Remove all uppercase and lowercase occurrences of char from polymer
func removeAll(polymer string, char rune) string {
	newPolymer := strings.ReplaceAll(polymer, strings.ToLower(string(char)), "")
	newPolymer = strings.ReplaceAll(newPolymer, strings.ToUpper(string(char)), "")
	return newPolymer
}
