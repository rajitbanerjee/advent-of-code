import * as _ from "lodash";

export function defaultdict(v: any) {
    return new Proxy(
        {},
        {
            get: (dict, k) => (k in dict ? dict[k] : (dict[k] = typeof v === "object" ? _.cloneDeep(v) : v)),
        }
    );
}
