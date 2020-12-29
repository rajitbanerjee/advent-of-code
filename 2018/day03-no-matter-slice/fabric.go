package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
)

type Claim struct {
	id                    string
	leftInches, topInches int
	width, height         int
}

type Fabric struct {
	width, height int
	layout        [][]string
}

func main() {
	claims := parseInput("day3.in")
	fabric := NewFabric(claims)
	countOverlapping, nonOverlappingID := fabric.fill(claims)

	fmt.Printf("Part 1: %d\n", countOverlapping)
	fmt.Printf("Part 2: %s\n", nonOverlappingID)
}

// Read file input and parse into a slice of Claim structs
func parseInput(filename string) []Claim {
	file, err := os.Open(filename)
	if err != nil {
		log.Fatal(err)
	}

	var claims []Claim
	sc := bufio.NewScanner(file)
	for sc.Scan() {
		var claim Claim
		fmt.Sscanf(sc.Text(), "#%s @ %d,%d: %dx%d", &claim.id, &claim.leftInches,
			&claim.topInches, &claim.width, &claim.height)
		claims = append(claims, claim)
	}
	return claims
}

// Create new fabric with dimensions and 2D layout
func NewFabric(claims []Claim) Fabric {
	var fabric Fabric
	fabric.computeDimensions(claims)

	fabric.layout = make([][]string, fabric.height)
	for i := range fabric.layout {
		fabric.layout[i] = make([]string, fabric.width)
	}
	return fabric
}

// Fabric must be large enough for the farthest claim (from top left)
func (f *Fabric) computeDimensions(claims []Claim) {
	for _, claim := range claims {
		if width := claim.leftInches + claim.width; width > f.width {
			f.width = width
		}
		if height := claim.topInches + claim.height; height > f.height {
			f.height = height
		}
	}
}

// Cover parts of the fabric with all the given claims
// Return overlapping square inches, and the only non-overlapping claim ID
func (f *Fabric) fill(claims []Claim) (int, string) {
	countOverlapping := 0
	ids := make(map[string]bool)
	overlapping := make(map[string]bool)

	for _, claim := range claims {
		for i := claim.topInches; i < claim.topInches+claim.height; i++ {
			for j := claim.leftInches; j < claim.leftInches+claim.width; j++ {
				if f.layout[i][j] == "" {
					// Fill available square inch with current claim ID
					f.layout[i][j] = claim.id
					if !overlapping[claim.id] {
						ids[claim.id] = true
					}
				} else {
					// Current claim ID overlaps with existing claim ID
					if f.layout[i][j] != "X" {
						countOverlapping++
					}

					delete(ids, f.layout[i][j])
					delete(ids, claim.id)
					overlapping[f.layout[i][j]] = true
					overlapping[claim.id] = true
					f.layout[i][j] = "X"
				}
			}
		}
	}

	// Only 1 non-overlapping ID expected, hence return after first iteration
	for nonOverlappingID := range ids {
		return countOverlapping, nonOverlappingID
	}
	panic("Error in filling fabric layout.")
}
