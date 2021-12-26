export const sortString = (e: string) => e.split("").sort().join("");
export const isLowerCase = (s: string) => s === s.toLowerCase();
export const isUpperCase = (s: string) => s === s.toUpperCase();
export const isAlpha = (ch: string) => /^[A-Z]$/i.test(ch);
export const chunks = (s: string, numberOfChunks: number): string[][] => {
  const chunks: string[][] = [];
  const lines = s.split("\n");
  const linesPerChunk = Math.floor(lines.length / numberOfChunks);
  for (let i = 0; i < lines.length; i += linesPerChunk) {
    chunks.push(lines.slice(i, i + linesPerChunk));
  }
  return chunks;
};
