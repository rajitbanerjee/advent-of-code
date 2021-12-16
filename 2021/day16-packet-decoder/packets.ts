#!/usr/bin/env ts-node
import { bin2dec, hex2bin, readAllLines } from "@utils";
import _ = require("lodash");

enum PacketTypeID {
  SUM = 0,
  PROD = 1,
  MIN = 2,
  MAX = 3,
  LITERAL_VALUE = 4,
  GREATER_THAN = 5,
  LESS_THAN = 6,
  EQUAL_TO = 7,
}

type Packet = {
  totalVersion: number; // Part 1
  value: number; // Part 2
  size: number;
};

const main = () => {
  const transmission: string = hex2bin(readAllLines("day16.in", "\n")[0]);
  const result = decode(transmission);
  console.log(`Part 1: ${result.totalVersion}`);
  console.log(`Part 2: ${result.value}`);
};

const decode = (transmission: string): Packet => {
  const version: number = bin2dec(transmission.slice(0, 3));
  const packetTypeID: PacketTypeID = bin2dec(transmission.slice(3, 6));
  const packet: Packet = { totalVersion: version, value: -1, size: 6 };
  transmission = transmission.slice(6);

  return packetTypeID === PacketTypeID.LITERAL_VALUE
    ? computeLiteralValue(transmission, packet)
    : processSubpackets(packetTypeID, transmission, packet);
};

const computeLiteralValue = (transmission: string, packet: Packet): Packet => {
  let [prefix, literal] = ["", ""];
  for (let i = 0; prefix !== "0"; i += 5, packet.size += 5) {
    prefix = transmission[i];
    literal += transmission.slice(i + 1, i + 5);
  }
  packet.value = bin2dec(literal);
  return packet;
};

const processSubpackets = (packetTypeID: PacketTypeID, transmission: string, packet: Packet): Packet => {
  const lengthTypeID = +transmission[0];
  const bits = lengthTypeID ? 11 + 1 : 15 + 1;
  const subpacketInfo = bin2dec(transmission.slice(1, bits));

  transmission = transmission.slice(bits, lengthTypeID ? undefined : bits + subpacketInfo);
  let numSubpackets = lengthTypeID ? subpacketInfo : Infinity;

  packet.size += bits;
  while (numSubpackets-- && transmission) {
    const subpacket: Packet = decode(transmission);
    transmission = transmission.slice(subpacket.size);
    combine(packetTypeID, packet, subpacket);
  }
  return packet;
};

const combine = (id: PacketTypeID, packet: Packet, subpacket: Packet): void => {
  packet.size += subpacket.size;
  packet.totalVersion += subpacket.totalVersion;
  packet.value = packet.value < 0 ? subpacket.value : evaluate(id, packet.value, subpacket.value);
};

const evaluate = (op: PacketTypeID, a: number, b: number) => {
  if (op === PacketTypeID.SUM) return a + b;
  if (op === PacketTypeID.PROD) return a * b;
  if (op === PacketTypeID.MIN) return Math.min(a, b);
  if (op === PacketTypeID.MAX) return Math.max(a, b);
  if (op === PacketTypeID.GREATER_THAN) return +(a > b);
  if (op === PacketTypeID.LESS_THAN) return +(a < b);
  if (op === PacketTypeID.EQUAL_TO) return +(a === b);
  return 0;
};

if (require.main === module) main();
