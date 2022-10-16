export function weave<T>(a: T[], b: T[]): T[] {
    const larger = a.length > b.length ? a : b;
    const smaller = a.length > b.length ? b : a;
    const result: T[] = [];
    const interval = Math.floor(larger.length / smaller.length);
    // for every interval in the larger array, add 1 from the smaller array
    for (let i = 0; i < larger.length; i++) {
        if (i % interval === 0) {
            result.push(smaller.shift() as T);
        }
        result.push(larger[i]);
    }
    return result;
}