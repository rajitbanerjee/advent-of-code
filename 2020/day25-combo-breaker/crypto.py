#!/usr/bin/env python

from typing import Tuple


def main() -> None:
    with open('day25.in') as f:
        card_pub_key, door_pub_key = map(int, (num.strip() for num in f))

    print(f"Part 1: {getEncryptionKey(card_pub_key, door_pub_key)}")


def getEncryptionKey(card_pub_key: int, door_pub_key: int) -> int:
    _, loop_size = transform(key=card_pub_key)
    encrytpion_key, _ = transform(subject=door_pub_key, loop=loop_size)
    return encrytpion_key


def transform(subject: int = 7, value: int = 1, key: int = 0,
              loop: int = 0) -> Tuple[int, int]:
    if loop:
        for i in range(loop):
            value = (value * subject) % 20201227
    else:
        while value != key:
            loop += 1
            value = (value * subject) % 20201227
    return (value, loop)


if __name__ == '__main__':
    main()
