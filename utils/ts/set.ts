export const isSuperset = (set: Set<any>, subset: Set<any>): boolean => {
  for (let elem of subset) if (!set.has(elem)) return false;
  return true;
};

export const union = (setA: Set<any>, setB: Set<any>): Set<any> => {
  let _union = new Set(setA);
  for (let elem of setB) _union.add(elem);
  return _union;
};

export const intersection = (setA: Set<any>, setB: Set<any>): Set<any> => {
  let _intersection = new Set();
  for (let elem of setB) if (setA.has(elem)) _intersection.add(elem);
  return _intersection;
};

export const symmetricDifference = (setA: Set<any>, setB: Set<any>): Set<any> => {
  let _difference = new Set(setA);
  for (let elem of setB) {
    if (_difference.has(elem)) _difference.delete(elem);
    else _difference.add(elem);
  }
  return _difference;
};

export const difference = (setA: Set<any>, setB: Set<any>): Set<any> => {
  let _difference = new Set(setA);
  for (let elem of setB) _difference.delete(elem);
  return _difference;
};
