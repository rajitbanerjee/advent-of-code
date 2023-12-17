import { readAllLines } from "@utils";
import * as _ from "lodash";

class CubeSet {
    red = 0;
    green = 0;
    blue = 0;
}

type Game = CubeSet[];

enum MaxCubeSet {
    RED = 12,
    GREEN = 13,
    BLUE = 14,
}

function parseGames(lines: string[]): { [key: string]: Game } {
    const games: { [key: string]: Game } = {};
    lines.forEach((line) => {
        const gameMatch = line.match(/Game (\d+): (.+)/);
        const gameNumber = Number(gameMatch[1]);
        const game: Game = [];
        const subsets = gameMatch[2].split("; ").map((subset) => subset.split(", "));
        subsets.forEach((subset) => {
            const cubeSet = new CubeSet();
            subset.forEach((cubes) => {
                const cubesMatch = cubes.match(/(\d+) (red|blue|green)/);
                cubeSet[cubesMatch[2]] = Number(cubesMatch[1]);
            });
            game.push(cubeSet);
        });
        games[gameNumber] = game;
    });
    return games;
}

function isCubSetPossible(cubeSet: CubeSet): boolean {
    return cubeSet.red <= MaxCubeSet.RED && cubeSet.green <= MaxCubeSet.GREEN && cubeSet.blue <= MaxCubeSet.BLUE;
}

function getPowerCubeSet(game: Game): number {
    const maxRed = Math.max(_.maxBy(game, "red").red, 1);
    const maxGreen = Math.max(_.maxBy(game, "green").green, 1);
    const maxBlue = Math.max(_.maxBy(game, "blue").blue, 1);
    return maxRed * maxGreen * maxBlue;
}

(() => {
    const lines = readAllLines("day02.in");
    const games = parseGames(lines);

    // part 1
    const sumPossibleGames = _.sum(Object.entries(games).map(([gameNumber, game]) => (game.every(isCubSetPossible) ? Number(gameNumber) : 0)));
    console.log(sumPossibleGames);

    // part 2
    const sumPowerCubeSets = _.sum(Object.values(games).map(getPowerCubeSet));
    console.log(sumPowerCubeSets);
})();
