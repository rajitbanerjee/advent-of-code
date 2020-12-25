#!/usr/bin/env python


def main() -> None:
    with open('day25.in') as f:
        card_pub_key, door_pub_key = map(int, (num.strip() for num in f))

    print(f"Part 1: {getEncryptionKey(card_pub_key, door_pub_key)}")


def getEncryptionKey(*public_keys: int, value: int = 1) -> int:
    for _ in range(getLoopSize(public_keys[0])):
        value = (value * public_keys[1]) % 20201227
    return value


def getLoopSize(key: int, value: int = 1, subject: int = 7) -> int:
    loop = 0
    while value != key:
        loop, value = loop + 1, (value * subject) % 20201227
    return loop


if __name__ == '__main__':
    main()
