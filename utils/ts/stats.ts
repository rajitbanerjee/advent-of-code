import * as _ from "lodash";

export function median(nums: number[]) {
    const sorted: number[] = _.cloneDeep(nums).sort((a, b) => a - b);
    const middle: number = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) _.mean([sorted[middle - 1], sorted[middle]]);
    return sorted[middle];
}

export function mode(items: any[]) {
    return _.sortBy(_.entries(_.countBy(items)), (i) => i[1]).pop();
}
