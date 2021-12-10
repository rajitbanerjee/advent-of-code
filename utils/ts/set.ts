export const isSuperset = (set: Set<any>, subset: Set<any>): boolean => {
  for (let elem of subset) if (!set.has(elem)) return false;
  return true;
};

export const symmetricDifference = (setA: Set<any>, setB: Set<any>): Set<any> => {
  let _difference = new Set(setA);
  for (let elem of setB) {
    if (_difference.has(elem)) _difference.delete(elem);
    else _difference.add(elem);
  }
  return _difference;
};
