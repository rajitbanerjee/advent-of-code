package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"strconv"
	"strings"
)

func main() {
	instructions := parseInput("day1.in")
	hqDist, firstRepDist := getHQDistance(instructions)
	fmt.Println("Part 1:", hqDist)
	fmt.Println("Part 2:", firstRepDist)
}

type Move struct {
	dir    string
	blocks int
}

func parseInput(filename string) []Move {
	line, err := ioutil.ReadFile(filename)
	if err != nil {
		log.Fatal(err)
	}
	arr := strings.Split(string(line), ", ")
	arr[len(arr)-1] = strings.Trim(arr[len(arr)-1], "\n")

	var seq []Move
	for _, move := range arr {
		dir := string(move[0])
		blocks, _ := strconv.Atoi(move[1:])
		seq = append(seq, Move{dir, blocks})
	}
	return seq
}

type Location [2]int

func getHQDistance(instructions []Move) (int, int) {
	x, y := 0, 0
	compass, dir := []string{"N", "E", "S", "W"}, 0

	var firstRepDist int
	var found bool
	seen := make(map[Location]bool)

	for _, move := range instructions {
		// Part 1
		if move.dir == "R" {
			dir = (dir + 1) % 4
		} else {
			if dir == 0 {
				dir += 4
			}
			dir = (dir - 1) % 4
		}

		for i := 0; i < move.blocks; i++ {
			if compass[dir] == "N" {
				y++
			} else if compass[dir] == "E" {
				x++
			} else if compass[dir] == "S" {
				y--
			} else {
				x--
			}
			// Part 2
			if _, ok := seen[Location{x, y}]; ok && !found {
				firstRepDist = abs(x) + abs(y)
				found = true
			}
			seen[Location{x, y}] = true
		}
	}
	return abs(x) + abs(y), firstRepDist
}

func abs(a int) int {
	if a < 0 {
		a = -a
	}
	return a
}
