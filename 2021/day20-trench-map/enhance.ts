#!/usr/bin/env ts-node
import { bin2dec, readAllLines } from "@utils";
import * as _ from "lodash";

type Image = {
    pixels: { [index: string]: Pixel };
    min: number;
    max: number;
};

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

const getPixel = (p: string): Pixel => (Number(p === "#") ? Pixel.LIGHT : Pixel.DARK);

const parseImage = (imageString: string): Image => {
    const matrix: Pixel[][] = imageString.split("\n").map((l) => l.split("").map(getPixel));
    const image: Image = { pixels: {}, min: 0, max: matrix.length };
    matrix.forEach((row, i) => row.forEach((c, j) => (image.pixels[str(i, j)] = c)));
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
    const enhanced: Image = { pixels: {}, min: image.min - 1, max: image.max + 1 };
    const r: number[] = _.range(image.min - 1, image.max + 1);
    r.forEach((i) => r.forEach((j) => (enhanced.pixels[str(i, j)] = algorithm[neighbours(i, j, image, border)])));
    ["pixels", "min", "max"].forEach((k) => (image[k] = enhanced[k]));
};

const neighbours = (i: number, j: number, image: Image, border: Pixel): number => {
    const d = [-1, 0, +1];
    const res = d.flatMap((x) => d.map((y) => Number(image.pixels[str(i + x, j + y)] ?? border)));
    return bin2dec(res.join(""));
};

if (require.main === module) main();
