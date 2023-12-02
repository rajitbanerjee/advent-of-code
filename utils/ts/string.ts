export function sortString(e: string) {
  return e.split("").sort().join("");
}

export function isLowerCase(s: string) {
  return s === s.toLowerCase();
}

export function isUpperCase(s: string) {
  return s === s.toUpperCase();
}

export function isAlpha(ch: string) {
  return /^[A-Z]$/i.test(ch);
}

export function chunks(s: string, numberOfChunks: number): string[][] {
  const chunks: string[][] = [];
  const lines = s.split("\n");
  const linesPerChunk = Math.floor(lines.length / numberOfChunks);
  for (let i = 0; i < lines.length; i += linesPerChunk) {
    chunks.push(lines.slice(i, i + linesPerChunk));
  }
  return chunks;
}

// RegExp
export function matchOverlap(input: string, re: RegExp) {
  let r: string[] = [],
    m: RegExpExecArray;
  if (!re.global) {
    re = new RegExp(re.source, (re + "").split("/").pop() + "g");
  }
  while ((m = re.exec(input))) {
    re.lastIndex -= m[0].length - 1;
    r.push(m[0]);
  }
  return r;
}
