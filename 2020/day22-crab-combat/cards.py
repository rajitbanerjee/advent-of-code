#!/usr/bin/env python

from copy import deepcopy
from typing import Tuple, List


def main() -> None:
    with open('day22.in') as f:
        players = parseInput([line.strip() for line in f])

    winner1, _ = getCombatWinner(*deepcopy(players))
    print(f"Part 1: {getScore(winner1)}")

    winner2, _ = getCombatWinner(*deepcopy(players), recursive=True)
    print(f"Part 2: {getScore(winner2)}")


def parseInput(lines: List[str]) -> Tuple[List[int], List[int]]:
    n = len(lines)
    player1 = list(map(int, lines[1: n//2]))
    player2 = list(map(int, lines[n//2 + 2:]))
    return (player1, player2)


def getScore(winner: List[int]) -> int:
    return sum(winner[i] * (len(winner) - i) for i in range(len(winner)))


def getCombatWinner(*players: List[int],
                    recursive: bool = False) -> Tuple[List[int], int]:
    seen = set()
    while all(p for p in players):
        # player 1 wins game if game state is repeated
        state = getState(*players)
        if state in seen:
            return (players[0], 0)
        seen.add(state)

        # pick the top card from both decks
        tops = tuple(players[i].pop(0) for i in (0, 1))

        if subGameNeeded(recursive, tops, *players):
            # play sub-game of recursive combat
            sub_game_players = (players[i][:tops[i]] for i in (0, 1))
            _, winner_idx = getCombatWinner(*sub_game_players, recursive=True)
        else:
            # player with higher-valued card wins
            winner_idx = tops.index(max(tops))

        # winner keeps both cards
        players[winner_idx].extend(reversed(tops) if winner_idx else tops)

    return (players[winner_idx], winner_idx)


def getState(*players: List[int]) -> str:
    # -1 is used as separator
    return ','.join(map(str, players[0] + [-1] + players[1]))


def subGameNeeded(recursive: bool, tops: Tuple[int, ...],
                  *players: List[int]) -> bool:
    # both players have at least as many cards remaining as their top card
    return recursive and all(tops[i] <= len(players[i]) for i in (0, 1))


if __name__ == '__main__':
    main()
