export function formatNumber(n: number) {
  const s = n.toString()
  return s[1] ? s : '0' + s
}

export function formatTextOverflow(text: string, maxLength: number) {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
}

export function range(start: number, end: number) {
  const li: number[] = [];
  for (let i = start; i < end; i++) {
    li.push(i);
  }
  return li;
}

export function randomInt(start: number, end: number) {
  return Math.trunc(Math.random() * (end - start)) + start;
}

export function tryParseNumber(text: string): string | number {
    const num = Number(text);
    return isNaN(num) ? text : num;
}

export function arrayGroupBy<K, T>(array: T[], key: string) {
    const map = new Map<K, T[]>();
    array.forEach((it: any) => {
        const li = map.get(it[key]) || [];
        li.push(it);
        map.set(it[key], li);
    });
    return map;
}