#!/usr/bin/env ts-node
import { bin2dec, readAllLines } from "@utils";
import * as _ from "lodash";

interface Image {
  pixels: { [index: string]: Pixel };
  min: number;
  max: number;
}

enum Pixel {
  DARK,
  LIGHT,
}

const main = () => {
  const [algString, imageString] = readAllLines("day20.in", "\n\n");
  const algorithm: Pixel[] = algString.split("").map(getPixel);
  const image: Image = parseImage(imageString);

  const [a, b] = ["Part 1", "Part 2"];
  console.time(a);
  console.timeLog(a, countLitPixels(_.cloneDeep(image), algorithm, 2));
  console.time(b);
  console.timeLog(b, countLitPixels(image, algorithm, 50));
};

const getPixel = (p: string): Pixel => (+(p === "#") ? Pixel.LIGHT : Pixel.DARK);

const parseImage = (imageString: string): Image => {
  const image: Image = { pixels: {}, min: 0, max: 0 };
  const matrix: Pixel[][] = imageString.split("\n").map((l) => l.split("").map(getPixel));

  matrix.forEach((row, i) => row.forEach((c, j) => (image.pixels[str(i, j)] = c)));
  image.min = 0;
  image.max = matrix.length;
  return image;
};

const str = (i: number, j: number): string => i + "," + j;

const countLitPixels = (image: Image, algorithm: Pixel[], times: number): number => {
  const toggle = algorithm[0] === Pixel.LIGHT;
  _.range(times).forEach((i) => {
    const newBorder = toggle ? (i % 2 === 0 ? Pixel.DARK : Pixel.LIGHT) : Pixel.DARK;
    enhance(image, algorithm, newBorder);
  });
  return _.countBy(_.values(image.pixels))[Pixel.LIGHT];
};

const enhance = (image: Image, algorithm: Pixel[], border: Pixel): void => {
  const enhancedImage: Image = { pixels: {}, min: image.min - 1, max: image.max + 1 };
  _.range(image.min - 1, image.max + 1).forEach((i) => {
    _.range(image.min - 1, image.max + 1).forEach((j) => {
      const index = bin2dec(neighbours(i, j, image, border));
      enhancedImage.pixels[str(i, j)] = algorithm[index];
    });
  });
  ["pixels", "min", "max"].forEach((k) => (image[k] = enhancedImage[k]));
};

const neighbours = (i: number, j: number, image: Image, border: Pixel): string => {
  const d = [-1, 0, 1];
  const res = d.flatMap((x) => d.map((y) => +(image.pixels[str(i + x, j + y)] ?? border)));
  return res.join("");
};

if (require.main === module) main();
