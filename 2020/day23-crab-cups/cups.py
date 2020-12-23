#!/usr/bin/env python

from typing import List, Tuple


class ListNode:
    def __init__(self, label):
        self.label = label
        self.next = None


def main() -> None:
    with open('day23.in') as f:
        labels = list(map(int, list(f.read().strip())))

    print(f"Part 1: {playGame(labels)}")
    print(f"Part 2: {playGame(labels, mistranslation=True, num_moves=10**7)}")


def playGame(labels: List[int], mistranslation: bool = False,
             num_moves: int = 100) -> str:
    first_cup, cups = arrangeCups(labels, mistranslation)
    current_cup = makeMoves(first_cup, cups, num_moves)

    if not mistranslation:
        # combine all labels after and up to (wrap around) cup 1
        labelling = ""
        while current_cup.label != 1:
            labelling += str(current_cup.label)
            current_cup = current_cup.next
        return labelling
    else:
        # product of two cups after cup 1
        return current_cup.label * current_cup.next.label


def arrangeCups(labels: List[int],
                mistranslation: bool = False) -> Tuple[ListNode, dict]:
    cups, last_cup = {}, None
    for label in labels:
        current_cup = ListNode(label)
        if last_cup:
            last_cup.next = current_cup
        last_cup = current_cup
        cups[label] = current_cup

    if mistranslation:
        for label in range(10, 10**6 + 1):
            current_cup = ListNode(label)
            if last_cup:
                last_cup.next = current_cup
            last_cup = current_cup
            cups[label] = current_cup

    first_cup = cups[labels[0]]
    if last_cup:
        last_cup.next = first_cup

    return (first_cup, cups)


def makeMoves(first_cup: ListNode, cups: dict, num_moves: int) -> ListNode:
    num_cups = len(cups)
    current_cup = first_cup

    for _ in range(num_moves):
        label = current_cup.label

        # remove three cups from the circle
        picked_cups = pickThreeCups(current_cup)
        current_cup.next = picked_cups[-1].next

        # select destination cup
        dest = label - 1 or num_cups
        while dest in (cup.label for cup in picked_cups):
            dest = dest - 1 or num_cups
        dest_cup = cups[dest]

        # place picked cups clockwise of destination cup
        picked_cups[-1].next = dest_cup.next
        dest_cup.next = picked_cups[0]

        current_cup = current_cup.next

    # cup immediately clockwise of cup 1
    return cups[1].next


def pickThreeCups(node: ListNode) -> Tuple[ListNode, ...]:
    pick1 = node.next
    pick2 = pick1.next
    pick3 = pick2.next
    return (pick1, pick2, pick3)


if __name__ == '__main__':
    main()
